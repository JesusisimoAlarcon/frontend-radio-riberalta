export const NoticiasNav = [
    {
        icon: 'pe-7s-sun',
        label: 'RIBERALTA',
        to: '#/noticias/riberalta'
    },
    {
        icon: 'pe-7s-world',
        label: 'INTERNACIONAL',
        to: '#/noticias/internacional'
    },
    {
        icon: 'pe-7s-portfolio',
        label: 'POLITICA',
        to: '#/noticias/politica'
    },
    {
        icon: 'pe-7s-cash',
        label: 'ECONOMIA',
        to: '#/noticias/economia'
    },
    {
        icon: 'pe-7s-hammer',
        label: 'JUDICIAL',
        to: '#/noticias/economia'
    },
    {
        icon: 'pe-7s-study',
        label: 'EDUCACION',
        to: '#/noticias/economia'
    },
    {
        icon: 'pe-7s-gym',
        label: 'DEPORTES',
        to: '#/noticias/economia'
    },
    {
        icon: 'pe-7s-science',
        label: 'TECNOLOGIA',
        to: '#/noticias/economia'
    },
    {
        icon: 'pe-7s-star',
        label: 'ENTRETENIMIENTO',
        to: '#/noticias/economia'
    }
];

export const RiberaltaNav = [
    {
        icon: 'pe-7s-culture',
        label: 'CULTURA',
        to: '#/farandula/nacional'
    },
    {
        icon: 'pe-7s-map-marker',
        label: 'SITIOS TURISTICOS',
        to: '#/farandula/riberalta'
    },
    {
        icon: 'pe-7s-smile',
        label: 'NUESTRA GENTE',
        to: '#/farandula/exterior'
    }
];
export const NostrosNav = [
    {
        icon: 'pe-7s-medal',
        label: 'QUIENES SOMOS?',
        to: '#/nosotros/quienes-somos'
    },
    {
        icon: 'pe-7s-target',
        label: 'NUESTROS SERVICIOS',
        to: '#/nosotros/nuestros-servicios'
    },
    {
        icon: 'pe-7s-radio',
        label: 'PROGRAMACION RADIAL',
        to: '#/nosotros/nuestra-programacion'
    }
];

export const AdminNav = [
    {
        icon: 'pe-7s-medal',
        label: 'NOTICIAS',
        content: [
            {
                label: 'Agregar nueva noticia',
                to: '#/administracion/registrar-noticia'
            },
            {
                label: 'Ver mis noticias agregadas',
                to: '#/administracion/listar-noticias'
            },
            {
                label: 'Quitar noticias',
                to: '#/administracion/quitar-noticia'
            }
        ]
    },
    {
        icon: 'pe-7s-target',
        label: 'PROGRAMACION',
        content: [
            {
                label: 'Registrar programa',
                to: '#/administracion/programa',
            },
            {
                label: 'Registrar conductor',
                to: '#/administracion/conductor',
            },
            {
                label: 'Crear programacion',
                to: '#/administracion/programacion',
            }
        ]
    },
    {
        icon: 'pe-7s-radio',
        label: 'CONFIGURACION',
        to: '#/nosotros/exterior'
    }
];