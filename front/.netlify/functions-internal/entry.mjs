import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import 'mime';
import 'cookie';
import 'html-escaper';
import { g as deserializeManifest } from './chunks/astro.14afed36.mjs';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'slash';
import 'preact';
import 'preact-render-to-string';
import 'path-to-regexp';
import 'string-width';

const _page0  = () => import('./chunks/index@_@astro.58ec5334.mjs');
const _page1  = () => import('./chunks/testimonials@_@astro.b669874d.mjs');
const _page2  = () => import('./chunks/portfolio@_@astro.6e380521.mjs');
const _page3  = () => import('./chunks/contact@_@astro.cb0cf091.mjs');
const _page4  = () => import('./chunks/admin@_@astro.21a96c9e.mjs');
const _page5  = () => import('./chunks/faq@_@astro.b843b8b8.mjs');
const _page6  = () => import('./chunks/index@_@astro.58809714.mjs');
const _page7  = () => import('./chunks/testimonials@_@astro.dbb5e7fc.mjs');
const _page8  = () => import('./chunks/portfolio@_@astro.e2701db0.mjs');
const _page9  = () => import('./chunks/contact@_@astro.00b26d0f.mjs');
const _page10  = () => import('./chunks/admin@_@astro.a9621510.mjs');
const _page11  = () => import('./chunks/faq@_@astro.cd659e75.mjs');
const _page12  = () => import('./chunks/_...62f81b67.mjs');
const _page13  = () => import('./chunks/index@_@astro.7b866da3.mjs');
const _page14  = () => import('./chunks/testimonials@_@astro.e4d10ca7.mjs');
const _page15  = () => import('./chunks/portfolio@_@astro.910e51b4.mjs');
const _page16  = () => import('./chunks/contact@_@astro.f77512f4.mjs');
const _page17  = () => import('./chunks/admin@_@astro.a33c906e.mjs');
const _page18  = () => import('./chunks/faq@_@astro.536ac883.mjs');
const _page19  = () => import('./chunks/_...b66875ae.mjs');
const _page20  = () => import('./chunks/_...f29feeff.mjs');const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/testimonials.astro", _page1],["src/pages/portfolio.astro", _page2],["src/pages/contact.astro", _page3],["src/pages/admin.astro", _page4],["src/pages/faq.astro", _page5],["src/pages/ro/index.astro", _page6],["src/pages/ro/testimonials.astro", _page7],["src/pages/ro/portfolio.astro", _page8],["src/pages/ro/contact.astro", _page9],["src/pages/ro/admin.astro", _page10],["src/pages/ro/faq.astro", _page11],["src/pages/ro/[...artistSlug].astro", _page12],["src/pages/ru/index.astro", _page13],["src/pages/ru/testimonials.astro", _page14],["src/pages/ru/portfolio.astro", _page15],["src/pages/ru/contact.astro", _page16],["src/pages/ru/admin.astro", _page17],["src/pages/ru/faq.astro", _page18],["src/pages/ru/[...artistSlug].astro", _page19],["src/pages/[...artistSlug].astro", _page20]]);const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/index.f3e10f02.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/testimonials.f3514651.css"},{"type":"external","src":"/_astro/faq.d7de2a2a.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/testimonials.f3514651.css"},{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/testimonials","type":"page","pattern":"^\\/testimonials\\/?$","segments":[[{"content":"testimonials","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/testimonials.astro","pathname":"/testimonials","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/portfolio.034c735e.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"}],"routeData":{"route":"/portfolio","type":"page","pattern":"^\\/portfolio\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio.astro","pathname":"/portfolio","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/contact.f566302f.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/contact","type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/faq.d7de2a2a.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/faq","type":"page","pattern":"^\\/faq\\/?$","segments":[[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq.astro","pathname":"/faq","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/index.f3e10f02.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/testimonials.f3514651.css"},{"type":"external","src":"/_astro/faq.d7de2a2a.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"}],"routeData":{"route":"/ro","type":"page","pattern":"^\\/ro\\/?$","segments":[[{"content":"ro","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ro/index.astro","pathname":"/ro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/testimonials.f3514651.css"},{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ro/testimonials","type":"page","pattern":"^\\/ro\\/testimonials\\/?$","segments":[[{"content":"ro","dynamic":false,"spread":false}],[{"content":"testimonials","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ro/testimonials.astro","pathname":"/ro/testimonials","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/portfolio.034c735e.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"}],"routeData":{"route":"/ro/portfolio","type":"page","pattern":"^\\/ro\\/portfolio\\/?$","segments":[[{"content":"ro","dynamic":false,"spread":false}],[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ro/portfolio.astro","pathname":"/ro/portfolio","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/contact.f566302f.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ro/contact","type":"page","pattern":"^\\/ro\\/contact\\/?$","segments":[[{"content":"ro","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ro/contact.astro","pathname":"/ro/contact","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ro/admin","type":"page","pattern":"^\\/ro\\/admin\\/?$","segments":[[{"content":"ro","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ro/admin.astro","pathname":"/ro/admin","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/faq.d7de2a2a.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ro/faq","type":"page","pattern":"^\\/ro\\/faq\\/?$","segments":[[{"content":"ro","dynamic":false,"spread":false}],[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ro/faq.astro","pathname":"/ro/faq","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/_...artistSlug_.3b673a70.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ro/[...artistslug]","type":"page","pattern":"^\\/ro(?:\\/(.*?))?\\/?$","segments":[[{"content":"ro","dynamic":false,"spread":false}],[{"content":"...artistSlug","dynamic":true,"spread":true}]],"params":["...artistSlug"],"component":"src/pages/ro/[...artistSlug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/index.f3e10f02.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/testimonials.f3514651.css"},{"type":"external","src":"/_astro/faq.d7de2a2a.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"}],"routeData":{"route":"/ru","type":"page","pattern":"^\\/ru\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/index.astro","pathname":"/ru","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/testimonials.f3514651.css"},{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ru/testimonials","type":"page","pattern":"^\\/ru\\/testimonials\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"testimonials","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/testimonials.astro","pathname":"/ru/testimonials","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/portfolio.034c735e.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"}],"routeData":{"route":"/ru/portfolio","type":"page","pattern":"^\\/ru\\/portfolio\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/portfolio.astro","pathname":"/ru/portfolio","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/contact.f566302f.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ru/contact","type":"page","pattern":"^\\/ru\\/contact\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/contact.astro","pathname":"/ru/contact","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ru/admin","type":"page","pattern":"^\\/ru\\/admin\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/admin.astro","pathname":"/ru/admin","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/faq.d7de2a2a.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ru/faq","type":"page","pattern":"^\\/ru\\/faq\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ru/faq.astro","pathname":"/ru/faq","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/_...artistSlug_.3b673a70.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/ru/[...artistslug]","type":"page","pattern":"^\\/ru(?:\\/(.*?))?\\/?$","segments":[[{"content":"ru","dynamic":false,"spread":false}],[{"content":"...artistSlug","dynamic":true,"spread":true}]],"params":["...artistSlug"],"component":"src/pages/ru/[...artistSlug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_...artistSlug_.99ddd8d0.css"},{"type":"external","src":"/_astro/_...artistSlug_.39f01d4c.css"},{"type":"external","src":"/_astro/index.3ec05be5.css"},{"type":"external","src":"/_astro/_...artistSlug_.7bd1b01c.css"},{"type":"external","src":"/_astro/_...artistSlug_.b8f35aec.css"},{"type":"external","src":"/_astro/_...artistSlug_.3b673a70.css"},{"type":"external","src":"/_astro/index.feaf0ba5.css"},{"type":"external","src":"/_astro/_...artistSlug_.3a797135.css"},{"type":"external","src":"/_astro/_...artistSlug_.c7a66c60.css"},{"type":"external","src":"/_astro/portfolio.b78674be.css"}],"routeData":{"route":"/[...artistslug]","type":"page","pattern":"^(?:\\/(.*?))?\\/?$","segments":[[{"content":"...artistSlug","dynamic":true,"spread":true}]],"params":["...artistSlug"],"component":"src/pages/[...artistSlug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/[...artistSlug].astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/faq.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/portfolio.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/[...artistSlug].astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/faq.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/portfolio.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/testimonials.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/[...artistSlug].astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/faq.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/portfolio.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/testimonials.astro",{"propagation":"none","containsHead":true}],["C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/testimonials.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(s,c,i)=>{let o=async()=>{await(await s())()},n=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){n.disconnect(),o();break}});for(let e=0;e<i.children.length;e++){let t=i.children[e];n.observe(t)}};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index@_@astro.58ec5334.mjs","\u0000@astro-page:src/pages/testimonials@_@astro":"chunks/testimonials@_@astro.b669874d.mjs","\u0000@astro-page:src/pages/portfolio@_@astro":"chunks/portfolio@_@astro.6e380521.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact@_@astro.cb0cf091.mjs","\u0000@astro-page:src/pages/admin@_@astro":"chunks/admin@_@astro.21a96c9e.mjs","\u0000@astro-page:src/pages/faq@_@astro":"chunks/faq@_@astro.b843b8b8.mjs","\u0000@astro-page:src/pages/ro/index@_@astro":"chunks/index@_@astro.58809714.mjs","\u0000@astro-page:src/pages/ro/testimonials@_@astro":"chunks/testimonials@_@astro.dbb5e7fc.mjs","\u0000@astro-page:src/pages/ro/portfolio@_@astro":"chunks/portfolio@_@astro.e2701db0.mjs","\u0000@astro-page:src/pages/ro/contact@_@astro":"chunks/contact@_@astro.00b26d0f.mjs","\u0000@astro-page:src/pages/ro/admin@_@astro":"chunks/admin@_@astro.a9621510.mjs","\u0000@astro-page:src/pages/ro/faq@_@astro":"chunks/faq@_@astro.cd659e75.mjs","\u0000@astro-page:src/pages/ro/[...artistSlug]@_@astro":"chunks/_...62f81b67.mjs","\u0000@astro-page:src/pages/ru/index@_@astro":"chunks/index@_@astro.7b866da3.mjs","\u0000@astro-page:src/pages/ru/testimonials@_@astro":"chunks/testimonials@_@astro.e4d10ca7.mjs","\u0000@astro-page:src/pages/ru/portfolio@_@astro":"chunks/portfolio@_@astro.910e51b4.mjs","\u0000@astro-page:src/pages/ru/contact@_@astro":"chunks/contact@_@astro.f77512f4.mjs","\u0000@astro-page:src/pages/ru/admin@_@astro":"chunks/admin@_@astro.a33c906e.mjs","\u0000@astro-page:src/pages/ru/faq@_@astro":"chunks/faq@_@astro.536ac883.mjs","\u0000@astro-page:src/pages/ru/[...artistSlug]@_@astro":"chunks/_...b66875ae.mjs","\u0000@astro-page:src/pages/[...artistSlug]@_@astro":"chunks/_...f29feeff.mjs","pageComponents/FAQPage/FAQPage":"_astro/FAQPage.0c4715f7.js","widgets/Steps/Steps":"_astro/Steps.3ab8a72a.js","pageComponents/TestimonialsPage/TestimonialsPage":"_astro/TestimonialsPage.e9c1d55e.js","widgets/Artists/Artists":"_astro/Artists.ea0662ec.js","widgets/Services/Services":"_astro/Services.97aba2cc.js","widgets/Faq/Faq":"_astro/Faq.abc692b5.js","widgets/FormSection/FormSection":"_astro/FormSection.bae8cfe1.js","pageComponents/ArtistPage/ArtistPage":"_astro/ArtistPage.6ed32f7b.js","@astrojs/preact/client.js":"_astro/client.389f1d90.js","C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.9e63f17a.js","shared/ui/ScrollIcon/ScrollIcon":"_astro/ScrollIcon.35e037f3.js","pageComponents/PortfolioPage/PortfolioPage":"_astro/PortfolioPage.f6074f6a.js","widgets/Portfolio/Portfolio":"_astro/Portfolio.ff08ae81.js","widgets/Header":"_astro/Header.3b844795.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/dungeon.eb6261a5.webp","/_astro/leovinkLogo.daf659c7.webp","/_astro/leovinkHorns.66d4d70c.png","/_astro/layer-middle.58ed6f6b.webp","/_astro/base-bg.c3f5d5f0.webp","/_astro/layer-front.d8c5e40f.webp","/_astro/dungeon2.72d5a2ab.webp","/_astro/care.b656e8c0.webp","/_astro/consult.e26866e0.webp","/_astro/update.190c32bc.webp","/_astro/logo.b05f7e21.png","/_astro/prepare.db5b2856.webp","/_astro/drawing.7e53e57f.webp","/_astro/treatment.bb697b21.webp","/_astro/ground.347704ed.webp","/_astro/map.1d053233.png","/_astro/ta1.725942ab.jpg","/_astro/ta2.f580d1ab.jpg","/_astro/ta5.586dfcd6.jpg","/_astro/ta4.7d42e0ed.jpg","/_astro/ta6.651524a8.jpg","/_astro/ta8.db785c69.jpg","/_astro/ta9.63801c8d.jpg","/_astro/ta10.cbf79de6.jpg","/_astro/ta7.d5ad0036.jpg","/_astro/ta11.e1d715ce.jpg","/_astro/ta12.b67d5ccb.jpg","/_astro/ta13.c303afcf.jpg","/_astro/ta16.89799ab0.jpg","/_astro/ta14.76f85843.jpg","/_astro/ta15.d7ecea8c.jpg","/_astro/ta19.2dace5a8.jpg","/_astro/ta17.70f8ef0d.jpg","/_astro/ta20.4d6e7de3.jpg","/_astro/ta21.b5f55c4e.jpg","/_astro/ta18.fc8274f9.jpg","/_astro/ta22.3fe7706a.jpg","/_astro/ta26.1828ca18.jpg","/_astro/ta24.70318e06.jpg","/_astro/ta23.520f2391.jpg","/_astro/ta25.471e9f91.jpg","/_astro/ta3.87632407.jpg","/_astro/ta27.97e6f631.jpg","/_astro/_...artistSlug_.39f01d4c.css","/_astro/_...artistSlug_.99ddd8d0.css","/_astro/_...artistSlug_.7bd1b01c.css","/_astro/_...artistSlug_.3a797135.css","/_astro/_...artistSlug_.c7a66c60.css","/_astro/_...artistSlug_.3b673a70.css","/_astro/_...artistSlug_.b8f35aec.css","/_astro/contact.f566302f.css","/_astro/faq.d7de2a2a.css","/_astro/index.3ec05be5.css","/_astro/index.feaf0ba5.css","/_astro/index.f3e10f02.css","/_astro/portfolio.034c735e.css","/_astro/portfolio.b78674be.css","/_astro/testimonials.f3514651.css","/favicon.ico","/favicon.svg","/_astro/AppLink.c31f2f3c.js","/_astro/ArrowDownIcon.ea5d214e.js","/_astro/ArtistPage.6ed32f7b.js","/_astro/Artists.ea0662ec.js","/_astro/Button.2117ffec.js","/_astro/ChevronDownIcon.9b55bd03.js","/_astro/client.389f1d90.js","/_astro/compat.module.2537d867.js","/_astro/CtaButton.70759b4e.js","/_astro/disableScroll.4fe3f659.js","/_astro/Faq.abc692b5.js","/_astro/faq.bcd3d602.43364fd5.js","/_astro/FaqBlock.6f65eede.js","/_astro/FAQPage.0c4715f7.js","/_astro/Form.f1c028ac.js","/_astro/FormSection.bae8cfe1.js","/_astro/GalleryGrid.61f87955.js","/_astro/Header.3b844795.js","/_astro/hooks.module.727d798a.js","/_astro/index.1332a7c9.b1fbaa82.js","/_astro/index.64369eb8.09973586.js","/_astro/index.66423ba1.d0465be6.js","/_astro/index.b87c14ee.css","/_astro/jsxRuntime.module.0319cdb6.js","/_astro/Modal.912794e0.js","/_astro/PlusIcon.60b4cd70.js","/_astro/portfolio.a5fa6088.bc849364.js","/_astro/portfolio.bcf6549b.771e1fd1.js","/_astro/portfolio.dfc1b224.0a2a5838.js","/_astro/Portfolio.ff08ae81.js","/_astro/PortfolioPage.f6074f6a.js","/_astro/preact.module.b7d2c21f.js","/_astro/ScrollIcon.35e037f3.js","/_astro/Section.a3ed4fb9.js","/_astro/Services.97aba2cc.js","/_astro/ShowMoreLink.580a5941.js","/_astro/signals.module.9e63f17a.js","/_astro/Steps.3ab8a72a.js","/_astro/swiper-slide.a13ade9a.js","/_astro/testimonials.184ffaed.3186dd73.js","/_astro/TestimonialsPage.e9c1d55e.js","/_astro/Typography.3d5e5bb0.js","/_astro/_...artistSlug_.87481691.82f230eb.js","/_astro/_...artistSlug_.88091b59.ba5a42e2.js","/_astro/_...artistSlug_.97ee5e3b.d54de2f0.js","/_astro/_...artistSlug_.b11b3c3e.913a1997.js","/_astro/_...artistSlug_.cad72046.b509a878.js","/_astro/_...artistSlug_.d004449d.css","/_astro/_...artistSlug_.eadb71ac.49431e27.js"]}), {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
