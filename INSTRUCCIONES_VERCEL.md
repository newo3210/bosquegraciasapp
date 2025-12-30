# 🚀 Guía de Despliegue a Vercel - BosqueGracias

## 📋 Requisitos Previos

- Proyecto creado y dependencias instaladas ✅
- Cuenta de GitHub
- Cuenta de Vercel (gratuita)

## 📦 Pasos para Desplegar

### 1. Configurar Git (si no lo has hecho)

```bash
git config --global user.email "tu-email@ejemplo.com"
git config --global user.name "Tu Nombre"
```

Luego, dentro del proyecto:

```bash
cd "F:\Cursor\web BOSQUE\base mini app\bosquegraciasapp"
git add .
git commit -m "Initial commit: BosqueGracias project structure"
```

### 2. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
   - Nombre sugerido: `bosquegraciasapp`
   - **NO** inicialices con README, .gitignore o licencia (ya los tenemos)

2. Conecta tu repositorio local con GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/bosquegraciasapp.git
git branch -M main
git push -u origin main
```

### 3. Desplegar en Vercel

#### Opción A: Desde el Dashboard de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"** o **"Import Project"**
3. Conecta tu cuenta de GitHub si aún no lo has hecho
4. Selecciona el repositorio `bosquegraciasapp`
5. Vercel detectará automáticamente que es un proyecto Next.js

#### Opción B: Usando Vercel CLI

```bash
npm install -g vercel
cd "F:\Cursor\web BOSQUE\base mini app\bosquegraciasapp"
vercel
```

Sigue las instrucciones en la terminal.

### 4. Configurar Variables de Entorno en Vercel

⚠️ **IMPORTANTE**: Debes configurar todas las variables de entorno antes del despliegue.

En el dashboard de Vercel:
1. Ve a tu proyecto
2. Ve a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:

#### Variables Requeridas:

```bash
# Upstash Redis (obtener en https://console.upstash.com/)
UPSTASH_REDIS_REST_URL=tu_url_aqui
UPSTASH_REDIS_REST_TOKEN=tu_token_aqui

# OnchainKit (obtener en https://portal.cdp.coinbase.com/)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=tu_project_id_aqui

# Blockchain Configuration
NEXT_PUBLIC_SDK_CHAIN_ID=8453
RPC_URL=https://mainnet.base.org

# Smart Contract Address (después de desplegar el contrato)
NEXT_PUBLIC_BOSQUE_NFT_ADDRESS=0x0000000000000000000000000000000000000000

# Pinata IPFS (obtener en https://pinata.cloud/)
NEXT_PUBLIC_PINATA_JWT=tu_jwt_aqui
NEXT_PUBLIC_PINATA_GATEWAY=tu_gateway_url_aqui

# Admin Wallet
ADMIN_WALLET_ADDRESS=tu_direccion_admin_aqui

# Application Configuration
NEXT_PUBLIC_APP_NAME=BosqueGracias
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app

# Farcaster (Opcional)
FARCASTER_API_KEY=NEYNAR_FROG_FM
```

⚠️ **Nota**: Las variables que empiezan con `NEXT_PUBLIC_` son públicas y estarán disponibles en el cliente.

### 5. Actualizar Farcaster Manifest

Después de obtener la URL de Vercel, actualiza `public/.well-known/farcaster.json`:

```json
{
  "miniapp": {
    "version": "1",
    "name": "BosqueGracias",
    "iconUrl": "https://tu-app.vercel.app/icon.png",
    "homeUrl": "https://tu-app.vercel.app",
    "imageUrl": "https://tu-app.vercel.app/image.png",
    "buttonTitle": "Open BosqueGracias",
    "splashImageUrl": "https://tu-app.vercel.app/splash.png",
    "splashBackgroundColor": "#ffffff",
    "tags": ["nft", "art", "base"],
    "primaryCategory": "entertainment"
  },
  "baseBuilder": {
    "ownerAddress": ""
  }
}
```

### 6. Desplegar

1. Si usaste Opción A (Dashboard):
   - Haz clic en **"Deploy"**
   - Espera a que termine el build
   - Tu app estará disponible en `https://tu-proyecto.vercel.app`

2. Si usaste Opción B (CLI):
   - El despliegue se hará automáticamente
   - Se te dará una URL al finalizar

### 7. Despliegues Automáticos

Una vez configurado, cada push a la rama `main` desplegará automáticamente la aplicación.

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

## 🔧 Configuración Adicional para Next.js

Next.js se detecta automáticamente, pero puedes personalizar en `next.config.js`:

- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)
- **Install Command**: `npm install` (automático)
- **Node Version**: 18.x o superior (seleccionable en Vercel)

## 📝 Notas Importantes

1. **Smart Contract**: Recuerda desplegar el contrato inteligente primero y actualizar `NEXT_PUBLIC_BOSQUE_NFT_ADDRESS`

2. **Variables de Entorno**: Nunca subas `.env.local` al repositorio (está en .gitignore)

3. **Dominio Personalizado**: Puedes configurar un dominio personalizado en Vercel → Settings → Domains

4. **Logs**: Puedes ver los logs del build y runtime en Vercel → Deployments

## 🐛 Solución de Problemas

### Error de Build

- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Vercel para ver el error específico
- Asegúrate de que `npm install` funcione localmente

### Error de Peer Dependencies (React 19)

Si ves errores como:
```
npm error Could not resolve dependency:
npm error peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from react-day-picker@8.10.1
```

**Solución**: El proyecto ya incluye un archivo `.npmrc` con `legacy-peer-deps=true` que resuelve este conflicto. Si el error persiste:
- Verifica que el archivo `.npmrc` esté en el repositorio
- Vercel debería usar automáticamente esta configuración

### Variables de Entorno no funcionan

- Las variables `NEXT_PUBLIC_*` deben tener el prefijo correcto
- Reinicia el deployment después de agregar nuevas variables
- Verifica que no haya espacios extras en los valores

### Problemas con Redis/Upstash

- Verifica que las credenciales de Upstash sean correctas
- Asegúrate de que la base de datos Redis esté activa en Upstash

## 🔗 Enlaces Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [OnchainKit Documentation](https://onchainkit.xyz)
- [Upstash Redis](https://docs.upstash.com/redis)

---

¡Listo para desplegar! 🌳✨

