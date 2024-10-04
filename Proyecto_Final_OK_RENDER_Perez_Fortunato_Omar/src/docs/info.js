export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API News",
            version: "1.0.0",
            description: "Documentacion de API News",
        },
        servers: [
            {
                url: "https://proyecto-final-ok-render-perez-fortunato.onrender.com",
            }
            
        ],
    },
    apis: ["./src/docs/*.yml"],
};
