const request = require("supertest");
const { crearApp } = require("../src/app");

describe("API Endpoints de Reservas (Tarea 1.3)", () => {
  
  test("POST /reservas exitoso responde 201 y llama a publicar una sola vez", async () => {
    const publicar = jest.fn().mockResolvedValue(true);
    const app = crearApp({ publicar });

    const res = await request(app)
      .post("/reservas")
      .send({ laboratorio: "lab-1", docente: "Juan", correo: "juan@unx.edu", inicio: 8, fin: 10 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(publicar).toHaveBeenCalledTimes(1);
  });

  test("Una segunda reserva que choca responde 409 y NO vuelve a llamar a publicar", async () => {
    const publicar = jest.fn().mockResolvedValue(true);
    const app = crearApp({ publicar });

    // Primera reserva
    await request(app)
      .post("/reservas")
      .send({ laboratorio: "lab-1", docente: "Juan", correo: "juan@unx.edu", inicio: 8, fin: 10 });

    // Segunda reserva (choca de 9 a 11)
    const res = await request(app)
      .post("/reservas")
      .send({ laboratorio: "lab-1", docente: "Maria", correo: "maria@unx.edu", inicio: 9, fin: 11 });

    expect(res.status).toBe(409);
    expect(publicar).toHaveBeenCalledTimes(1); // No debe incrementar porque falló
  });

  test("DELETE /reservas/:id con un ID inexistente debe responder 404", async () => {
    const app = crearApp({});
    const res = await request(app).delete("/reservas/RES-9999");
    expect(res.status).toBe(404);
  });

});