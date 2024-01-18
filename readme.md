# Api to upload files with Cloudflare R2

### Requisitos não funcionais (RNFs)
- [x] Using Cloudflare R2 to upload files
- [x] Uploading must be done directly from the front-end using Presigned URLs
- [x] Sharing links must be signed to prevent public access

### Exemplo de upload

```js
 http --form PUT https://example-upload-dev.10292b14168cb4e2d4f98c84ad0f699e.r2.cloudflarestorage.com/file.mp4\?X-Amz-Algorithm\=AWS4-HMAC-SHA256\&X-Amz-Content-Sha256\=UNSIGNED-PAYLOAD\&X-Amz-Credential\=a6d180224c7a6f3d0beeeaa1f097ff82%2F20240118%2Fauto%2Fs3%2Faws4_request\&X-Amz-Date\=20240118T025149Z\&X-Amz-Expires\=600\&X-Amz-Signature\=a1bf7b6ae8c32ff7115e967f710e5dcc78d6b0accf559a62cd50474716013f5f\&X-Amz-SignedHeaders\=host\&x-id\=PutObject "Content-Type":"video/mp4" < example.mp4 
```