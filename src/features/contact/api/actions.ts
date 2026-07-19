"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(formData: unknown): Promise<ContactResponse> {
  // 1. Validar los datos en el servidor (Crucial por seguridad)
  const result = contactSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = result.data;

  try {
    // 2. Simular un envío de correo electrónico o guardado en base de datos
    // En producción, aquí usarías Resend, SendGrid, o lo guardarías en tu DB.
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulamos latencia de red

    console.log("📨 Mensaje recibido en el backend vía Server Action:", { name, email, message });

    // 3. Retornar éxito
    return {
      success: true,
      message: "Mensaje enviado exitosamente.",
    };
  } catch (error) {
    console.error("Error al procesar el formulario de contacto:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado al enviar el mensaje.",
    };
  }
}
