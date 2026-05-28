import API from "../api";
// 🔐 LOGIN CURSOS ASA
export const loginCursos = async ({
    dni,
    contrasena,
    app = 12,
}) => {
    /*  console.log("🚀 Iniciando autenticación...");
     console.log("👤 Usuario:", usuario); */

    try {
        const response = await API.get("/login/cursos", {
            params: {
                dni,
                contrasena,
                app,
            },
        });

        /*         console.log("📊 Status:", response.status);
         */
        if (response.status === 200) {
            const data = response.data;

            if (!data || data.length === 0) {
                throw new Error("Usuario o contraseña incorrectos");
            }

            const userData = data[0];

            if (userData.estado === "S") {
                /* console.log("✅ Usuario autenticado"); */
                return userData;
            } else {
                throw new Error("Usuario inactivo");
            }
        } else {
            throw new Error(`Error del servidor: ${response.status}`);
        }
    } catch (error) {
        console.error("❌ Error en login:", error);

        // Manejo parecido a Flutter
        if (error.code === "ECONNABORTED") {
            throw new Error("Tiempo de espera agotado");
        }

        if (!error.response) {
            throw new Error("usuario o contraseña incorrecta");
        }

        throw new Error(
            error.response?.data?.message || "Error en autenticación"
        );
    }
};
