import { motion } from 'framer-motion'
import { Gamepad2, Clipboard, Wrench, Users, Monitor, Smartphone } from 'lucide-react'

const Games = () => {
  const games = [
    {
      title: 'CMMS',
      description: 'İba Valresa A.Ş. için geliştirilmiş, aktif kullanımda olan bilgisayar destekli bakım yönetimi web uygulaması.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      category: 'Web Uygulaması',
      platform: 'Web',
      status: 'Yayında',
      statusColor: 'bg-green-500/90',
      icon: Wrench,
    },
    {
      title: 'Hidden Pairs',
      description: 'Hafızanı test et! Kartları eşleştirerek zihni güçlendiren klasik kart eşleştirme oyunu.',
      image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&h=600&fit=crop',
      category: 'Oyun',
      platform: '1-4 Oyuncu',
      status: 'Geliştiriliyor',
      statusColor: 'bg-yellow-500/90',
      icon: Gamepad2,
    },
    {
      title: 'Online Clipboard',
      description: 'Cihazlar arası anlık senkronize pano. Kopyaladığın içerik web ve mobil arasında anında paylaşılır.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      category: 'Web & Mobil',
      platform: 'Web + Mobil',
      status: 'Geliştiriliyor',
      statusColor: 'bg-yellow-500/90',
      icon: Clipboard,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Projelerimiz</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Web, mobil ve oyun alanında geliştirdiğimiz projeleri keşfedin
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {games.map((game, index) => {
            const Icon = game.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 card-glow transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 ${game.statusColor} backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold`}>
                    {game.status}
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="relative">
                      <Icon className="w-10 h-10 text-primary-400" />
                      <div className="absolute inset-0 blur-xl bg-primary-500 opacity-50" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{game.title}</h3>
                    <span className="text-xs text-primary-400 bg-primary-500/20 px-2 py-1 rounded">
                      {game.category}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4">{game.description}</p>

                  <div className="flex items-center text-sm text-gray-500">
                    <Monitor className="w-4 h-4 mr-2" />
                    {game.platform}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/50 rounded-lg text-primary-400 font-semibold transition-colors"
                  >
                    Detaylı Bilgi
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Games
