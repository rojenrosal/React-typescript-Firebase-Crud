import firebase from "../firebase";
import IEsportsData from "../types/esports.type";

const db = firebase.collection("/esports");

class EsportsDataService {
  getAll() {
    return db;
  }

  create(esports: IEsportsData) {
    return db.add(esports);
  }

  update(id: string, value: any) {
    return db.doc(id).update(value);
  }

  delete(id: string) {
    return db.doc(id).delete();
  }
}

export default new EsportsDataService();
