import { Router } from "express";
import axios from "axios";
import log from "../logger";

const router = Router();

router.get("/decisionnel/hello", (req, res, next) => {
  res.send("Hello World !");
});

router.get("/decisionnel/hello/all", async (req, res, next) => {
  try {
    const requests = await Promise.all([
      axios.get(process.env.URL_RELATION_CLIENT + "/hello").then((response) => {
        return "relation-client:" + response.data;
      }),
      axios.get(process.env.URL_DECISIONNEL + "/hello").then((response) => {
        return "monetique-et-paiement:" + response.data;
      }),
      axios
        .get(process.env.URL_GESTION_PROMOTION + "/hello")
        .then((response) => {
          return "gestion-promotion:" + response.data;
        }),
      axios
        .get(process.env.URL_REFERENCIEL_PRODUIT + "/hello")
        .then((response) => {
          return "referenciel-produit:" + response.data;
        }),
      axios
        .get(process.env.URL_GESTION_COMMERCIAL + "/hello")
        .then((response) => {
          return "gestion-commercial:" + response.data;
        }),
      axios
        .get(process.env.URL_BACK_OFFICE_MAGASIN + "/hello")
        .then((response) => {
          return "back-office-magasin:" + response.data;
        }),
      axios
        .get(process.env.URL_GESTION_ENTREPOTS + "/hello")
        .then((response) => {
          return "relation-client:" + response.data;
        }),
      axios.get(process.env.URL_CAISSE + "/hello").then((response) => {
        return "caisse:" + response.data;
      }),
      axios.get(process.env.URL_E_COMMERCE + '/hello').then((response) => {
          return "e-commerce:" + response.data;
      })
    ]);
    res.status(200).json({ res: requests });

  } catch (error) {
    log.error(error);
    res.sendStatus(404);
  }

});

export default router;