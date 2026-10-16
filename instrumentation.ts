/**
 * Corre una vez al arrancar el servidor. Lo específico de Node va en un
 * archivo aparte para que no se compile en el runtime edge.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation-node");
  }
}
