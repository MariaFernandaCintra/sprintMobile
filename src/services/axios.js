import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://192.168.12.225:5000/reservas/v1/",
  headers: {
    accept: "application/json",
  },
});

// Interceptor para adicionar o token em cada requisição
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("tokenUsuario");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postLogin: (usuario) => api.post("login/", usuario),
  postCadastro: (usuario) => api.post("cadastro/", usuario),

  getSalas: () => api.get("salas"),
  getSalasDisponivelHorario: (sala) => api.post(`salasdisponivelhorario/`, sala),

  getPerfil: (id_usuario) => api.get(`usuario/perfil/${id_usuario}`),
  getUsuarioById: (id_usuario) => api.get(`usuario/perfil/${id_usuario}`),
  getUsuarioReservasById: (id_usuario) => api.get(`usuario/perfil/${id_usuario}/reservas`),

  verificarSenhaUsuario: (id_usuario, confirmarSenha) => api.post(`usuario/verificarsenha/${id_usuario}`, confirmarSenha),
  
  postReserva: (reserva) => api.post("reserva/simples/", reserva),
  postReservaPeriodica: (reserva) => api.post("reserva/periodica/", reserva),
  putReserva: (id_reserva, reservaAtualizada) => api.put(`/reserva/simples/${id_reserva}`, reservaAtualizada),
  putReservaPeriodica: (id_reserva, reservaAtualizada) => api.put(`/reserva/periodica/${id_reserva}`, reservaAtualizada),
  putAtualizarUsuario:(id_usuario, dadosAtualizados) => api.put(`/usuario/${id_usuario}`, dadosAtualizados),
  deleteReserva: (id_reserva, id_usuario) => api.delete(`reserva/${id_reserva}/${id_usuario}`),
  
  getReservasHistoricoById: (id_usuario) => api.get(`/usuario/historico/${id_usuario}`),
  getReservasDeletadasById: (id_usuario) => api.get(`/usuario/deletadas/${id_usuario}`),
  deleteUsuario: (id_usuario) => api.delete(`/usuario/${id_usuario}`),
};


export default sheets;
