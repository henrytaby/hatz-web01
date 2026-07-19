import { test, expect } from '@playwright/test';

test('La página de inicio carga correctamente y la navegación funciona', async ({ page }) => {
  await page.goto('/');
  // Verificamos que el título principal de alguna página exista o que la navegación esté visible
  // Nota: Esto asume que tienes un componente Navbar o algo similar.
  const navbar = page.locator('nav');
  await expect(navbar).toBeVisible();
});

test('El formulario de contacto valida campos vacíos', async ({ page }) => {
  await page.goto('/contact');
  
  // Hacemos clic en enviar sin llenar datos
  await page.getByRole('button', { name: /enviar mensaje/i }).click();

  // Verificamos que Zod muestre los errores en pantalla
  await expect(page.getByText('El nombre debe tener al menos 2 caracteres')).toBeVisible();
  await expect(page.getByText('Correo electrónico inválido')).toBeVisible();
  await expect(page.getByText('El mensaje debe tener al menos 10 caracteres')).toBeVisible();
});
