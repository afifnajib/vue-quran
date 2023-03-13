import http from "../http-common";

class DataService {
  getAll() {
    return http.get("quran/id.asad");
  }

  getSurah(){
    return http.get("surah");
  }

//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }

//   create(data) {
//     return http.post("/tutorials", data);
//   }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

export default new DataService();

// https://www.bezkoder.com/vue-3-crud/