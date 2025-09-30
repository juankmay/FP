import React, { useState, useEffect } from 'react';
import { Building2, GraduationCap, Users, MapPin, TrendingUp, CheckCircle } from 'lucide-react';

const App = () => {
  // Coordenadas geográficas de municipios y distritos de Málaga
  const coordenadasMunicipios = {
    // Málaga Capital - Distritos
    'Málaga Centro': { lat: 36.7213, lng: -4.4214 },
    'Málaga Este': { lat: 36.7180, lng: -4.3800 },
    'Málaga Ciudad Jardín': { lat: 36.7350, lng: -4.4100 },
    'Málaga Bailén-Miraflores': { lat: 36.7100, lng: -4.4300 },
    'Málaga Palma-Palmilla': { lat: 36.7050, lng: -4.4450 },
    'Málaga Cruz de Humilladero': { lat: 36.7180, lng: -4.4350 },
    'Málaga Carretera de Cádiz': { lat: 36.6950, lng: -4.4650 },
    'Málaga Churriana': { lat: 36.6650, lng: -4.5000 },
    'Málaga Campanillas': { lat: 36.7350, lng: -4.5350 },
    'Málaga Puerto de la Torre': { lat: 36.7450, lng: -4.4950 },
    'Málaga Teatinos-Universidad': { lat: 36.7250, lng: -4.4750 },
    
    // Costa del Sol Occidental
    'Torremolinos': { lat: 36.6200, lng: -4.5000 },
    'Benalmádena': { lat: 36.5989, lng: -4.5166 },
    'Fuengirola': { lat: 36.5400, lng: -4.6262 },
    'Mijas': { lat: 36.5950, lng: -4.6369 },
    'Marbella': { lat: 36.5095, lng: -4.8826 },
    'Estepona': { lat: 36.4270, lng: -5.1476 },
    
    // Valle del Guadalhorce
    'Alhaurín de la Torre': { lat: 36.6594, lng: -4.5594 },
    'Alhaurín el Grande': { lat: 36.6403, lng: -4.6861 },
    'Cártama': { lat: 36.7133, lng: -4.6344 },
    'Pizarra': { lat: 36.7656, lng: -4.7017 },
    'Coín': { lat: 36.6594, lng: -4.7594 },
    'Álora': { lat: 36.8269, lng: -4.7025 },
    
    // Axarquía
    'Vélez-Málaga': { lat: 36.7833, lng: -4.1000 },
    'Torre del Mar': { lat: 36.7450, lng: -4.0950 },
    'Rincón de la Victoria': { lat: 36.7175, lng: -4.2739 },
    'Torrox': { lat: 36.7528, lng: -3.9522 },
    'Nerja': { lat: 36.7453, lng: -3.8794 },
    'Algarrobo': { lat: 36.7639, lng: -4.0294 },
    
    // Antequera y Comarca
    'Antequera': { lat: 37.0192, lng: -4.5594 },
    'Archidona': { lat: 37.0967, lng: -4.3869 },
    'Villanueva de la Concepción': { lat: 37.0078, lng: -4.5247 },
    
    // Serranía de Ronda
    'Ronda': { lat: 36.7428, lng: -5.1656 },
    'Cuevas del Becerro': { lat: 36.8494, lng: -5.0200 },
    
    // Otros municipios
    'Casabermeja': { lat: 36.8772, lng: -4.4239 },
    'Colmenar': { lat: 36.9094, lng: -4.3372 },
    'Totalán': { lat: 36.7739, lng: -4.2917 },
    'Comares': { lat: 36.8419, lng: -4.2528 }
  };

  const zonasDistritos = Object.keys(coordenadasMunicipios).sort();

  const familiaProfesional = [
    'Informática y Comunicaciones',
    'Administración y Gestión',
    'Sanidad',
    'Electricidad y Electrónica',
    'Comercio y Marketing',
    'Hostelería y Turismo',
    'Fabricación Mecánica',
    'Transporte y Mantenimiento de Vehículos',
    'Servicios Socioculturales y a la Comunidad',
    'Instalación y Mantenimiento'
  ];

  const sectoresProductivos = [
    'Tecnología e IT',
    'Administración',
    'Salud y Servicios Sanitarios',
    'Industrial y Electrónica',
    'Comercio y Retail',
    'Hostelería y Restauración',
    'Industria Manufacturera',
    'Automoción',
    'Servicios Sociales',
    'Mantenimiento e Instalaciones'
  ];

  // Datos de ejemplo precargados para demostración
  const centrosIniciales = [
    {
      id: 1,
      nombre: 'IES Politécnico Jesús Marín',
      contacto: 'María González Ruiz',
      email: 'coordinacion.fpdual@iesjesusmarin.es',
      telefono: '952 13 23 45',
      zona: 'Málaga Centro',
      familiaProfesional: 'Informática y Comunicaciones',
      numAlumnos: '28',
      scoreNecesidad: 7
    },
    {
      id: 2,
      nombre: 'IES La Rosaleda',
      contacto: 'Antonio Martín López',
      email: 'fpdual@ieslarosaleda.es',
      telefono: '952 26 47 89',
      zona: 'Málaga Centro',
      familiaProfesional: 'Administración y Gestión',
      numAlumnos: '32',
      scoreNecesidad: 8
    },
    {
      id: 3,
      nombre: 'IES Politécnico Cristo Rey',
      contacto: 'Carmen Sánchez Torres',
      email: 'dual@cristorey.edu.es',
      telefono: '952 32 15 67',
      zona: 'Málaga Este',
      familiaProfesional: 'Electricidad y Electrónica',
      numAlumnos: '24',
      scoreNecesidad: 6
    },
    {
      id: 4,
      nombre: 'IES Ben Gabirol',
      contacto: 'Juan Carlos Fernández',
      email: 'practicas@iesbengabirol.es',
      telefono: '952 29 84 56',
      zona: 'Málaga Carretera de Cádiz',
      familiaProfesional: 'Hostelería y Turismo',
      numAlumnos: '36',
      scoreNecesidad: 9
    },
    {
      id: 5,
      nombre: 'IES Campanillas',
      contacto: 'Laura Jiménez Morales',
      email: 'fpdual@iescampanillas.com',
      telefono: '952 40 12 34',
      zona: 'Málaga Campanillas',
      familiaProfesional: 'Informática y Comunicaciones',
      numAlumnos: '30',
      scoreNecesidad: 5
    },
    {
      id: 6,
      nombre: 'IES Portada Alta',
      contacto: 'Rafael Muñoz García',
      email: 'coordinacion@portadaalta.es',
      telefono: '952 29 67 23',
      zona: 'Málaga Palma-Palmilla',
      familiaProfesional: 'Fabricación Mecánica',
      numAlumnos: '22',
      scoreNecesidad: 8
    },
    {
      id: 7,
      nombre: 'IES Guadalmedina',
      contacto: 'Isabel Ruiz Navarro',
      email: 'dual@guadalmedina.es',
      telefono: '952 25 78 90',
      zona: 'Málaga Centro',
      familiaProfesional: 'Sanidad',
      numAlumnos: '26',
      scoreNecesidad: 7
    },
    {
      id: 8,
      nombre: 'CIFP Málaga Tech',
      contacto: 'Francisco López Díaz',
      email: 'empresas@malagatech.es',
      telefono: '952 30 45 67',
      zona: 'Málaga Teatinos-Universidad',
      familiaProfesional: 'Informática y Comunicaciones',
      numAlumnos: '42',
      scoreNecesidad: 4
    },
    {
      id: 9,
      nombre: 'IES Playamar',
      contacto: 'Ana Rodríguez Pérez',
      email: 'fpdual@iesplayamar.es',
      telefono: '952 38 56 78',
      zona: 'Torremolinos',
      familiaProfesional: 'Hostelería y Turismo',
      numAlumnos: '38',
      scoreNecesidad: 6
    },
    {
      id: 10,
      nombre: 'IES Vega de Mijas',
      contacto: 'Manuel Torres Ramírez',
      email: 'coordinacion@vegademijas.es',
      telefono: '952 59 34 21',
      zona: 'Mijas',
      familiaProfesional: 'Comercio y Marketing',
      numAlumnos: '20',
      scoreNecesidad: 7
    },
    {
      id: 11,
      nombre: 'IES Martín de Aldehuela',
      contacto: 'Patricia Moreno Silva',
      email: 'dual@martinaldehuela.es',
      telefono: '952 27 89 45',
      zona: 'Málaga Este',
      familiaProfesional: 'Transporte y Mantenimiento de Vehículos',
      numAlumnos: '18',
      scoreNecesidad: 8
    },
    {
      id: 12,
      nombre: 'IES Ben Al Jatib',
      contacto: 'David Sánchez Ortega',
      email: 'practicas@benaljatib.es',
      telefono: '952 26 90 12',
      zona: 'Vélez-Málaga',
      familiaProfesional: 'Administración y Gestión',
      numAlumnos: '25',
      scoreNecesidad: 9
    }
  ];

  const empresasIniciales = [
    {
      id: 1,
      nombre: 'TechSolutions Málaga',
      contacto: 'Roberto García Vega',
      email: 'rrhh@techsolutions.es',
      telefono: '952 60 12 34',
      zona: 'Málaga Teatinos-Universidad',
      sector: 'Tecnología e IT',
      numPlazas: '8',
      descripcion: 'Empresa de desarrollo software especializada en soluciones cloud y aplicaciones móviles.'
    },
    {
      id: 2,
      nombre: 'Deloitte Málaga',
      contacto: 'Cristina Herrera Ruiz',
      email: 'formacion@deloitte.es',
      telefono: '952 13 45 67',
      zona: 'Málaga Centro',
      sector: 'Administración',
      numPlazas: '12',
      descripcion: 'Consultora internacional con oficina en Málaga especializada en auditoría y asesoramiento empresarial.'
    },
    {
      id: 3,
      nombre: 'Grupo Hospitalario Quirónsalud',
      contacto: 'Elena Martínez Campos',
      email: 'practicas@quironsalud.es',
      telefono: '952 64 78 90',
      zona: 'Málaga Este',
      sector: 'Salud y Servicios Sanitarios',
      numPlazas: '6',
      descripcion: 'Red hospitalaria privada con múltiples centros en Málaga.'
    },
    {
      id: 4,
      nombre: 'Endesa Málaga',
      contacto: 'Miguel Ángel Soto Díaz',
      email: 'talento@endesa.es',
      telefono: '952 35 67 89',
      zona: 'Málaga Carretera de Cádiz',
      sector: 'Industrial y Electrónica',
      numPlazas: '5',
      descripcion: 'Compañía eléctrica con instalaciones de distribución y mantenimiento en Málaga.'
    },
    {
      id: 5,
      nombre: 'Hotel Meliá Costa del Sol',
      contacto: 'Lucía Ramírez Gómez',
      email: 'empleos@melia.com',
      telefono: '952 38 94 56',
      zona: 'Torremolinos',
      sector: 'Hostelería y Restauración',
      numPlazas: '15',
      descripcion: 'Cadena hotelera de 4 estrellas con necesidades constantes de personal cualificado en hostelería.'
    },
    {
      id: 6,
      nombre: 'Accenture Technology Center',
      contacto: 'Jorge Navarro Pérez',
      email: 'careers.malaga@accenture.com',
      telefono: '952 10 23 45',
      zona: 'Málaga Teatinos-Universidad',
      sector: 'Tecnología e IT',
      numPlazas: '20',
      descripcion: 'Centro tecnológico global con más de 2000 empleados en Málaga, especializados en inteligencia artificial.'
    },
    {
      id: 7,
      nombre: 'Mercadona Málaga',
      contacto: 'Sandra López Torres',
      email: 'seleccion@mercadona.es',
      telefono: '952 45 67 89',
      zona: 'Alhaurín de la Torre',
      sector: 'Comercio y Retail',
      numPlazas: '10',
      descripcion: 'Cadena de supermercados con bloque logístico y múltiples tiendas en la provincia.'
    },
    {
      id: 8,
      nombre: 'Talleres Huertas Motor',
      contacto: 'Carlos Huertas Jiménez',
      email: 'administracion@huertasmotor.es',
      telefono: '952 24 56 78',
      zona: 'Málaga Este',
      sector: 'Automoción',
      numPlazas: '4',
      descripcion: 'Taller multimarca especializado en diagnosis electrónica y mecánica avanzada.'
    },
    {
      id: 9,
      nombre: 'Google Cloud Málaga',
      contacto: 'Patricia Romero Vega',
      email: 'estudiantes@google.com',
      telefono: '952 60 89 12',
      zona: 'Málaga Campanillas',
      sector: 'Tecnología e IT',
      numPlazas: '6',
      descripcion: 'Centro de operaciones cloud de Google con enfoque en infraestructura y ciberseguridad.'
    },
    {
      id: 10,
      nombre: 'NH Hoteles Costa del Sol',
      contacto: 'Fernando Durán Mora',
      email: 'formacion@nh-hotels.com',
      telefono: '952 59 23 45',
      zona: 'Marbella',
      sector: 'Hostelería y Restauración',
      numPlazas: '8',
      descripcion: 'Grupo hotelero con varios establecimientos en la Costa del Sol occidental.'
    },
    {
      id: 11,
      nombre: 'Fujitsu España',
      contacto: 'Marta Suárez Campos',
      email: 'hr.malaga@fujitsu.com',
      telefono: '952 61 34 56',
      zona: 'Málaga Campanillas',
      sector: 'Tecnología e IT',
      numPlazas: '7',
      descripcion: 'Multinacional japonesa de servicios TI con centro de desarrollo en el PTA.'
    },
    {
      id: 12,
      nombre: 'KPMG Málaga',
      contacto: 'Alberto Fernández Castro',
      email: 'practicas.malaga@kpmg.es',
      telefono: '952 13 67 89',
      zona: 'Málaga Centro',
      sector: 'Administración',
      numPlazas: '6',
      descripcion: 'Firma de auditoría y consultoría con oficina en pleno centro de Málaga.'
    },
    {
      id: 13,
      nombre: 'Hospital Regional de Málaga',
      contacto: 'Rosa María Gil Santos',
      email: 'docencia@hospitalregional.es',
      telefono: '952 29 00 00',
      zona: 'Málaga Carretera de Cádiz',
      sector: 'Salud y Servicios Sanitarios',
      numPlazas: '10',
      descripcion: 'Hospital público de referencia con programas formativos en múltiples especialidades sanitarias.'
    },
    {
      id: 14,
      nombre: 'El Corte Inglés Málaga',
      contacto: 'Javier Molina Ortiz',
      email: 'seleccion.malaga@elcorteingles.es',
      telefono: '952 30 10 00',
      zona: 'Málaga Centro',
      sector: 'Comercio y Retail',
      numPlazas: '12',
      descripcion: 'Gran almacén con múltiples departamentos y oportunidades de formación comercial.'
    },
    {
      id: 15,
      nombre: 'Indra Sistemas',
      contacto: 'Beatriz Morales Ruiz',
      email: 'talento.malaga@indracompany.com',
      telefono: '952 61 45 67',
      zona: 'Málaga Teatinos-Universidad',
      sector: 'Tecnología e IT',
      numPlazas: '9',
      descripcion: 'Empresa tecnológica española especializada en soluciones de transformación digital.'
    }
  ];

  const [activeTab, setActiveTab] = useState('matches');
  const [centros, setCentros] = useState(centrosIniciales);
  const [empresas, setEmpresas] = useState(empresasIniciales);
  const [matches, setMatches] = useState([]);

  const [formCentro, setFormCentro] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    zona: '',
    familiaProfesional: '',
    numAlumnos: '',
    scoreNecesidad: 5
  });

  const [formEmpresa, setFormEmpresa] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    zona: '',
    sector: '',
    numPlazas: '',
    descripcion: ''
  });

  // Función para calcular distancia en km entre dos coordenadas usando Haversine
  const calcularDistanciaKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calcularDistancia = (zona1, zona2) => {
    if (zona1 === zona2) return 0;
    
    const coord1 = coordenadasMunicipios[zona1];
    const coord2 = coordenadasMunicipios[zona2];
    
    if (!coord1 || !coord2) return 999;
    
    const distanciaKm = calcularDistanciaKm(coord1.lat, coord1.lng, coord2.lat, coord2.lng);
    
    if (distanciaKm <= 5) return 0;
    if (distanciaKm <= 15) return 1;
    if (distanciaKm <= 30) return 2;
    if (distanciaKm <= 50) return 3;
    return 4;
  };

  const calcularCompatibilidad = (centro, empresa) => {
    const coord1 = coordenadasMunicipios[centro.zona];
    const coord2 = coordenadasMunicipios[empresa.zona];
    
    const distanciaKm = coord1 && coord2 ? 
      calcularDistanciaKm(coord1.lat, coord1.lng, coord2.lat, coord2.lng) : 999;
    
    const distancia = calcularDistancia(centro.zona, empresa.zona);
    
    const coincidenciaFamilia = 
      centro.familiaProfesional === 'Informática y Comunicaciones' && empresa.sector === 'Tecnología e IT' ||
      centro.familiaProfesional === 'Administración y Gestión' && empresa.sector === 'Administración' ||
      centro.familiaProfesional === 'Sanidad' && empresa.sector === 'Salud y Servicios Sanitarios' ||
      centro.familiaProfesional === 'Hostelería y Turismo' && empresa.sector === 'Hostelería y Restauración' ||
      centro.familiaProfesional === 'Electricidad y Electrónica' && empresa.sector === 'Industrial y Electrónica' ||
      centro.familiaProfesional === 'Comercio y Marketing' && empresa.sector === 'Comercio y Retail' ||
      centro.familiaProfesional === 'Fabricación Mecánica' && empresa.sector === 'Industria Manufacturera' ||
      centro.familiaProfesional === 'Transporte y Mantenimiento de Vehículos' && empresa.sector === 'Automoción' ||
      centro.familiaProfesional === 'Servicios Socioculturales y a la Comunidad' && empresa.sector === 'Servicios Sociales' ||
      centro.familiaProfesional === 'Instalación y Mantenimiento' && empresa.sector === 'Mantenimiento e Instalaciones';
    
    let score = 0;
    
    if (distancia === 0) score += 40;
    else if (distancia === 1) score += 35;
    else if (distancia === 2) score += 25;
    else if (distancia === 3) score += 15;
    else score += 5;
    
    score += coincidenciaFamilia ? 30 : 5;
    score += centro.scoreNecesidad * 3;
    
    return {
      score: Math.min(100, score),
      distanciaKm: Math.round(distanciaKm * 10) / 10
    };
  };

  const recalcularMatches = (centrosActuales, empresasActuales) => {
    const nuevosMatches = [];
    centrosActuales.forEach(centro => {
      empresasActuales.forEach(empresa => {
        const resultado = calcularCompatibilidad(centro, empresa);
        if (resultado.score > 40) {
          nuevosMatches.push({
            centro,
            empresa,
            compatibilidad: resultado.score,
            distanciaKm: resultado.distanciaKm,
            id: `${centro.id}-${empresa.id}`
          });
        }
      });
    });
    nuevosMatches.sort((a, b) => b.compatibilidad - a.compatibilidad);
    setMatches(nuevosMatches);
  };

  // Calcular emparejamientos iniciales al cargar la aplicación
  useEffect(() => {
    recalcularMatches(centrosIniciales, empresasIniciales);
  }, []);

  const handleSubmitCentro = () => {
    if (!formCentro.nombre || !formCentro.contacto || !formCentro.email || 
        !formCentro.telefono || !formCentro.zona || !formCentro.familiaProfesional || 
        !formCentro.numAlumnos) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }
    const nuevoCentro = { ...formCentro, id: Date.now() };
    setCentros([...centros, nuevoCentro]);
    setFormCentro({
      nombre: '',
      contacto: '',
      email: '',
      telefono: '',
      zona: '',
      familiaProfesional: '',
      numAlumnos: '',
      scoreNecesidad: 5
    });
    recalcularMatches([...centros, nuevoCentro], empresas);
  };

  const handleSubmitEmpresa = () => {
    if (!formEmpresa.nombre || !formEmpresa.contacto || !formEmpresa.email || 
        !formEmpresa.telefono || !formEmpresa.zona || !formEmpresa.sector || 
        !formEmpresa.numPlazas) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }
    const nuevaEmpresa = { ...formEmpresa, id: Date.now() };
    setEmpresas([...empresas, nuevaEmpresa]);
    setFormEmpresa({
      nombre: '',
      contacto: '',
      email: '',
      telefono: '',
      zona: '',
      sector: '',
      numPlazas: '',
      descripcion: ''
    });
    recalcularMatches(centros, [...empresas, nuevaEmpresa]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Plataforma FP Dual Málaga
          </h1>
          <p className="text-lg text-gray-600">
            Sistema de Emparejamiento Centros Educativos - Empresas
          </p>
        </div>

        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab('centros')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'centros'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <GraduationCap size={20} />
            Centros Educativos
          </button>
          <button
            onClick={() => setActiveTab('empresas')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'empresas'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Building2 size={20} />
            Empresas
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'matches'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TrendingUp size={20} />
            Emparejamientos ({matches.length})
          </button>
        </div>

        {activeTab === 'centros' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="text-blue-600" />
                Registro de Centro Educativo
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Centro *
                  </label>
                  <input
                    type="text"
                    value={formCentro.nombre}
                    onChange={(e) => setFormCentro({...formCentro, nombre: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="IES Ejemplo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Persona de Contacto *
                    </label>
                    <input
                      type="text"
                      value={formCentro.contacto}
                      onChange={(e) => setFormCentro({...formCentro, contacto: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formCentro.email}
                      onChange={(e) => setFormCentro({...formCentro, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={formCentro.telefono}
                      onChange={(e) => setFormCentro({...formCentro, telefono: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zona/Distrito *
                    </label>
                    <select
                      value={formCentro.zona}
                      onChange={(e) => setFormCentro({...formCentro, zona: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      {zonasDistritos.map(zona => (
                        <option key={zona} value={zona}>{zona}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Familia Profesional *
                  </label>
                  <select
                    value={formCentro.familiaProfesional}
                    onChange={(e) => setFormCentro({...formCentro, familiaProfesional: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    {familiaProfesional.map(familia => (
                      <option key={familia} value={familia}>{familia}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Alumnos *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formCentro.numAlumnos}
                      onChange={(e) => setFormCentro({...formCentro, numAlumnos: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Score de Necesidad (1-10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formCentro.scoreNecesidad}
                      onChange={(e) => setFormCentro({...formCentro, scoreNecesidad: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <div className="text-center text-lg font-bold text-blue-600 mt-1">
                      {formCentro.scoreNecesidad}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmitCentro}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Registrar Centro
                </button>
              </div>

              {centros.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Centros Registrados ({centros.length})
                  </h3>
                  <div className="space-y-3">
                    {centros.map(centro => (
                      <div key={centro.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{centro.nombre}</h4>
                            <p className="text-sm text-gray-600">{centro.familiaProfesional}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin size={14} />
                              {centro.zona} • {centro.numAlumnos} alumnos
                            </p>
                          </div>
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Necesidad: {centro.scoreNecesidad}/10
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'empresas' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Building2 className="text-blue-600" />
                Registro de Empresa
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Empresa *
                  </label>
                  <input
                    type="text"
                    value={formEmpresa.nombre}
                    onChange={(e) => setFormEmpresa({...formEmpresa, nombre: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Empresa S.L."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Persona de Contacto *
                    </label>
                    <input
                      type="text"
                      value={formEmpresa.contacto}
                      onChange={(e) => setFormEmpresa({...formEmpresa, contacto: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formEmpresa.email}
                      onChange={(e) => setFormEmpresa({...formEmpresa, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={formEmpresa.telefono}
                      onChange={(e) => setFormEmpresa({...formEmpresa, telefono: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zona/Distrito *
                    </label>
                    <select
                      value={formEmpresa.zona}
                      onChange={(e) => setFormEmpresa({...formEmpresa, zona: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      {zonasDistritos.map(zona => (
                        <option key={zona} value={zona}>{zona}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sector Productivo *
                    </label>
                    <select
                      value={formEmpresa.sector}
                      onChange={(e) => setFormEmpresa({...formEmpresa, sector: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      {sectoresProductivos.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Plazas Ofrecidas *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formEmpresa.numPlazas}
                      onChange={(e) => setFormEmpresa({...formEmpresa, numPlazas: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción / Información Adicional
                  </label>
                  <textarea
                    value={formEmpresa.descripcion}
                    onChange={(e) => setFormEmpresa({...formEmpresa, descripcion: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describa brevemente su empresa y el tipo de formación que puede ofrecer..."
                  />
                </div>

                <button
                  onClick={handleSubmitEmpresa}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Registrar Empresa
                </button>
              </div>

              {empresas.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Empresas Registradas ({empresas.length})
                  </h3>
                  <div className="space-y-3">
                    {empresas.map(empresa => (
                      <div key={empresa.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{empresa.nombre}</h4>
                            <p className="text-sm text-gray-600">{empresa.sector}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin size={14} />
                              {empresa.zona} • {empresa.numPlazas} plazas
                            </p>
                          </div>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            <Users size={14} className="inline mr-1" />
                            {empresa.numPlazas}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="text-blue-600" />
                Emparejamientos Sugeridos
              </h2>
              
              {matches.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Users size={64} className="mx-auto" />
                  </div>
                  <p className="text-gray-600 text-lg">
                    No hay emparejamientos disponibles aún.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Registre centros educativos y empresas para ver las sugerencias de emparejamiento.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Demostración con Datos Reales</h3>
                    <p className="text-sm text-blue-900 mb-2">
                      Esta aplicación muestra centros educativos y empresas representativos de la provincia de Málaga. La compatibilidad se calcula considerando la proximidad geográfica real en kilómetros (40% del score), la coincidencia entre familia profesional y sector productivo (30%), y el score de necesidad del centro educativo (30%).
                    </p>
                    <p className="text-sm text-blue-800">
                      Puede navegar a las pestañas de Centros Educativos o Empresas para registrar nuevas entidades y observar cómo el sistema genera automáticamente nuevos emparejamientos en tiempo real.
                    </p>
                  </div>

                  {matches.map(match => (
                    <div key={match.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap size={20} className="text-blue-600" />
                            <h3 className="font-semibold text-gray-900">{match.centro.nombre}</h3>
                          </div>
                          <p className="text-sm text-gray-600 ml-7">{match.centro.familiaProfesional}</p>
                          <p className="text-sm text-gray-500 ml-7">
                            {match.centro.zona} • {match.centro.numAlumnos} alumnos • Necesidad: {match.centro.scoreNecesidad}/10
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-center mx-8">
                          <div className={`text-2xl font-bold ${
                            match.compatibilidad >= 80 ? 'text-green-600' :
                            match.compatibilidad >= 60 ? 'text-blue-600' :
                            'text-orange-600'
                          }`}>
                            {Math.round(match.compatibilidad)}%
                          </div>
                          <div className="text-xs text-gray-500 mb-2">compatibilidad</div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            <MapPin size={14} />
                            {match.distanciaKm} km
                          </div>
                          <CheckCircle className={`mt-2 ${
                            match.compatibilidad >= 80 ? 'text-green-600' :
                            match.compatibilidad >= 60 ? 'text-blue-600' :
                            'text-orange-600'
                          }`} size={24} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 size={20} className="text-green-600" />
                            <h3 className="font-semibold text-gray-900">{match.empresa.nombre}</h3>
                          </div>
                          <p className="text-sm text-gray-600 ml-7">{match.empresa.sector}</p>
                          <p className="text-sm text-gray-500 ml-7">
                            {match.empresa.zona} • {match.empresa.numPlazas} plazas disponibles
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Contacto Centro:</span>
                            <p className="text-gray-600">{match.centro.contacto}</p>
                            <p className="text-gray-600">{match.centro.email}</p>
                            <p className="text-gray-600">{match.centro.telefono}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Contacto Empresa:</span>
                            <p className="text-gray-600">{match.empresa.contacto}</p>
                            <p className="text-gray-600">{match.empresa.email}</p>
                            <p className="text-gray-600">{match.empresa.telefono}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;