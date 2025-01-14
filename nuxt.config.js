
import axios from 'axios';


const dynamicRoutes = async () => {
    // const r_tags = await axios.get(process.env.API_URL+'/tags/export?from=config.js');
    // const t_tags = r_tags.data.map((obj) => {
    //                     // return {
    //                     //     route: '/tag/' + obj.slug,
    //                     //     payload: tagtag,
    //                     // };
    //                     return '/tag/' + obj.slug   ;
    //                     // return '/tag/' + obj.slug + '/';
    //                 });
    const t_routes = [];
    const r_tools = await axios.get(process.env.API_URL+'/tools/export?from=config.js');

    for( const tool of r_tools.data ) {
        const route = {
            url: '/tool/' + tool.slug,
            lastmodISO: tool.updated_at,
            priority: 1
        };
        if( tool.picture !== null ) {
            route.img = [
                {
                    url: '/assets/img/tools/'+tool.picture,
                    caption: tool.short_descr,
                    title: tool.nicename
                }
            ];
        }
        t_routes.push(route);
    }

    // const t_routes = t_tags.concat(t_tools);
    // console.log(t_routes);

    return t_routes;
}


export default {
    // https://nuxtjs.org/docs/concepts/server-side-rendering
    ssr: true,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'server',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: process.env.APP_NAME,
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'X-UA-Compatible', content: 'IE=edge' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'keywords', name: 'keywords', content: 'offsec,security,bug bounty,tools,pentest,red team' },
            { hid: 'description', name: 'description', content: 'A vast collection of security tools' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: process.env.APP_NAME },
            { hid: 'og:url', property: 'og:url', content: process.env.APP_URL },
            { hid: 'og:title', property: 'og:title', content: process.env.APP_NAME },
            { hid: 'og:description', property: 'og:description', content: 'A vast collection of security tools' },
            { hid: 'og:image', property: 'og:image', content: process.env.APP_URL+'/assets/img/preview.png' },
            { name: 'twitter:site', content: 'gwendallecoguic' },
            { name: 'twitter:creator', content: 'gwendallecoguic' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { hid: 'twitter:title', name: 'twitter:title', content: process.env.APP_NAME },
            { hid: 'twitter:description', name: 'twitter:description', content: 'A vast collection of security tools' },
            { hid: 'twitter:image', name: 'twitter:image', content: process.env.APP_URL+'/assets/img/preview.png' },
        ],
        link: [
            { hid: 'canonical', rel: 'canonical', href: process.env.APP_URL },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
        ],
        script: [
            { src: "/js/bootstrap.bundle.min.js" },
        ]
    },

    router: {
        // scrollBehavior() {
        //     console.log('aaaaa');
        //     document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
        // },
            // scrollBehavior() {
            //     return {top: 0, left: 0};
            // },
        // function scrollBehavior (to, from, savedPosition) {
        //     console.log(savedPosition);
        //   return { x: 0, y: 0 };
        // },
        // routes: [
        //   {
        //     path: '/',
        //     name: 'Home',
        //     component: Home
        //   }
        // ],
        mode: 'history'
    },

    // router: {
    //     async function scrollBehavior (to, from, savedPosition) {
    //       if (savedPosition) {
    //         return savedPosition
    //       }

    //       const findEl = async (hash, x) => {
    //         return document.querySelector(hash) ||
    //           new Promise((resolve, reject) => {
    //             if (x > 50) {
    //               return resolve()
    //             }
    //             setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
    //           })
    //       }

    //       if (to.hash) {
    //         let el = await findEl(to.hash)
    //         if ('scrollBehavior' in document.documentElement.style) {
    //           return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    //         } else {
    //           return window.scrollTo(0, el.offsetTop)
    //         }
    //       }

    //       return { x: 0, y: 0 }
    //     }
    //   },

    // router: {
    //     mode: 'hash',
    //     keepDefaultRouter: false,
    // //     scrollBehavior(to, from, savedPosition) {
    // //         if( savedPosition ) {
    // //             alert(1);
    // //             return savedPosition;
    // //         } else {
    // //             alert(0);
    // //             return { x: 0, y: 0 };
    // //         }
    // //     }
    // },

    basePath: '/',

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/custom.css',
        // '@/assets/scss/custom.scss',
    ],

    // Loading bar https://nuxtjs.org/docs/2.x/features/loading
    loading: {
        color: '#22d3ee',
        height: '2px'
    },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/sitemap',
        '@nuxt/image',
        '@nuxtjs/google-analytics',
    ],

    sitemap: {
        hostname: process.env.APP_URL,
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: process.env.API_URL,
    },

    googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID
    },

    // public vars
    publicRuntimeConfig: {
        APP_NAME: process.env.APP_NAME,
        APP_URL: process.env.APP_URL,
        APP_ENV: process.env.APP_ENV,
        GITHUB_URL: process.env.GITHUB_URL,
        googleAnalytics: {
            id: process.env.GOOGLE_ANALYTICS_ID
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    generate: {
        fallback: "404.html",
        routes: dynamicRoutes,
    },
}
