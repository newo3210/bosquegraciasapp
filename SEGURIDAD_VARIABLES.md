# 🔐 Guía de Seguridad de Variables de Entorno

## ⚠️ Importante: Variables `NEXT_PUBLIC_` vs Variables de Servidor

En Next.js, las variables que comienzan con `NEXT_PUBLIC_` se exponen al navegador (cliente). **Cualquier persona puede verlas** en el código fuente de la página.

## ✅ Variables Seguras para el Cliente (`NEXT_PUBLIC_`)

Estas variables **PUEDEN** tener el prefijo `NEXT_PUBLIC_` porque son seguras de exponer:

- ✅ `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Clave pública de OnchainKit (diseñada para uso público)
- ✅ `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID` - ID público del proyecto
- ✅ `NEXT_PUBLIC_SDK_CHAIN_ID` - ID de la cadena blockchain (información pública)
- ✅ `NEXT_PUBLIC_BOSQUE_NFT_ADDRESS` - Dirección del contrato (pública en la blockchain)
- ✅ `NEXT_PUBLIC_PINATA_GATEWAY` - URL del gateway IPFS (solo lectura)
- ✅ `NEXT_PUBLIC_APP_NAME` - Nombre de la aplicación
- ✅ `NEXT_PUBLIC_APP_URL` - URL pública de la aplicación

## ⚠️ Variables que NO deben tener `NEXT_PUBLIC_`

Estas variables **NUNCA** deben tener el prefijo `NEXT_PUBLIC_` porque contienen información sensible:

- ❌ `PINATA_JWT` (antes `NEXT_PUBLIC_PINATA_JWT`) - **Token JWT de Pinata**
  - **Riesgo**: Si se expone, cualquiera puede usar tu cuenta de Pinata
  - **Solución**: Usar solo en API routes del servidor (`/api/*`)

- ❌ `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`
  - **Riesgo**: Acceso completo a tu base de datos Redis
  - **Solución**: Solo usar en API routes o funciones del servidor

- ❌ `ADMIN_WALLET_ADDRESS`
  - **Riesgo**: Expone la dirección del admin (menor riesgo, pero mejor mantener privado)
  - **Solución**: Solo usar en verificaciones del servidor

- ❌ `FARCASTER_API_KEY`
  - **Riesgo**: Permite hacer llamadas a la API de Farcaster con tu clave
  - **Solución**: Solo usar en API routes

- ❌ `RPC_URL`
  - **Riesgo**: Menor, pero mejor mantener privado si es un RPC personalizado

## 📋 Configuración Correcta en Vercel

### Variables del Cliente (públicas):
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=xxx
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=xxx
NEXT_PUBLIC_SDK_CHAIN_ID=8453
NEXT_PUBLIC_BOSQUE_NFT_ADDRESS=0x...
NEXT_PUBLIC_PINATA_GATEWAY=https://...
NEXT_PUBLIC_APP_NAME=BosqueGracias
NEXT_PUBLIC_APP_URL=https://...
```

### Variables del Servidor (privadas) - SIN prefijo `NEXT_PUBLIC_`:
```
PINATA_JWT=xxx                    ← CAMBIADO (antes tenía NEXT_PUBLIC_)
UPSTASH_REDIS_REST_URL=xxx
UPSTASH_REDIS_REST_TOKEN=xxx
ADMIN_WALLET_ADDRESS=xxx
FARCASTER_API_KEY=xxx
RPC_URL=xxx
```

## 🔧 Cómo Usar el JWT de Pinata de Forma Segura

Si necesitas subir archivos a Pinata desde tu aplicación:

### ❌ INCORRECTO (exponer JWT al cliente):
```typescript
// En un componente del cliente
const pinFile = async (file: File) => {
  const jwt = process.env.NEXT_PUBLIC_PINATA_JWT; // ❌ Expuesto al navegador
  // ... subir archivo
};
```

### ✅ CORRECTO (usar API route):
```typescript
// 1. Crear API route: src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const jwt = process.env.PINATA_JWT; // ✅ Solo en el servidor
  const formData = await request.formData();
  // ... subir archivo a Pinata usando jwt
  return NextResponse.json({ success: true });
}

// 2. En el cliente:
const pinFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  // ... manejar respuesta
};
```

## 🔍 Cómo Verificar si una Variable está Expuesta

1. Abre tu aplicación en el navegador
2. Presiona F12 para abrir las herramientas de desarrollador
3. Ve a la pestaña "Sources" o "Network"
4. Busca el archivo JavaScript del bundle
5. Busca el nombre de la variable (ej: `PINATA_JWT`)

Si encuentras una variable privada en el código del cliente, **está expuesta** y debes moverla al servidor.

## 📝 Resumen de Cambios

Si ya tenías `NEXT_PUBLIC_PINATA_JWT` configurado en Vercel:

1. **Cambia el nombre** en Vercel de `NEXT_PUBLIC_PINATA_JWT` a `PINATA_JWT`
2. **Actualiza tu código** para usar `process.env.PINATA_JWT` solo en API routes
3. **Crea una API route** para manejar uploads si es necesario

---

**Recuerda**: Cuando Vercel te advierte sobre `NEXT_PUBLIC_`, siempre revisa si realmente necesitas exponer esa variable al cliente.

