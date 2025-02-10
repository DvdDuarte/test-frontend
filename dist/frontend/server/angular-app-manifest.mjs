
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/slot-machine"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 27848, hash: 'b652789d5fba9c3d460b0515e10036fd94451f53881b28a88520b4f2844ca030', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17151, hash: '5085d06755ece11368f9442f0841e0e4c830704892a2f2ac676e68ee7f207dcd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'slot-machine/index.html': {size: 74592, hash: '4b3a27a2d3489d4104521e7465b75cd8dac7e6830e6b8fef5f127b694baaa53c', text: () => import('./assets-chunks/slot-machine_index_html.mjs').then(m => m.default)},
    'index.html': {size: 120906, hash: '8613dd5e4f87197cfd932a3ffe6b0800a033af598e5d41f27af8e3fd3efb12c4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-63PMUIWA.css': {size: 238590, hash: 'bWTlSPeaBYE', text: () => import('./assets-chunks/styles-63PMUIWA_css.mjs').then(m => m.default)}
  },
};
