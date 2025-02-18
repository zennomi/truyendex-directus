import { defineEndpoint } from "@directus/extensions-sdk";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

export default defineEndpoint((router, context) => {
  router.get("/", (_req, res) => {
    res.json({ message: "Hello, world!" });
  });
  router.get("/map", async (_req, res) => {
    try {
      if (!_req.query.source || !_req.query.ids) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      const source = _req.query.source;
      const ids = (_req.query.ids as string).split(",");
      const fromVariants = await context
        .database("title_variant")
        .where("source", source)
        .whereIn("source_id", ids)
        .whereNotNull("title")
        .where("status", "published")
        .select("*");
      const toVariants = await context
        .database("title_variant")
        .where("source", "mangadex")
        .whereIn(
          "title",
          fromVariants.map((v) => v.title)
        )
        .select("*");
      const result: Record<string, string[]> = {};
      fromVariants.forEach((v) => {
        const matchedVariants = toVariants.filter((tv) => tv.title === v.title);
        if (matchedVariants.length > 0) {
          result[v.source_id] = matchedVariants.map((mv) => mv.source_id);
        }
      });
      return res.json({ result });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  });
  router.get("/test-proxy", async (_req, res) => {
    try {
      if (!_req.query.proxyId) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      const proxyId = _req.query.proxyId as string;

      const proxy = await context
        .database("proxy")
        .where("id", proxyId)
        .first();

      if (!proxy) {
        return res.status(404).json({ error: "Proxy not found" });
      }

      const url =
        (_req.query.url as string) || "https://api.mangadex.org/manga";

      const start = Date.now();
      const { data } = await axios({
        url,
        httpsAgent: new HttpsProxyAgent(
          proxy.username
            ? `http://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`
            : `http://${proxy.ip}:${proxy.port}`
        ),
      });
      const end = Date.now();
      const responseTime = end - start;

      return res.json({ responseTime });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  });
});
