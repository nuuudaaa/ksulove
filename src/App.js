import React from 'react';
import { Heart, Sparkles, Sun, Moon, Star, Flower, Flower2, Cherry } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const heartControls = useAnimation();
  const letterControls = useAnimation();

  // Анимация сердца
  useEffect(() => {
    heartControls.start({
      scale: [1, 1.3, 1],
      y: [0, -35, 0],
      rotate: [-10, 10, -10],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      },
    });
  }, [heartControls]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const openLetter = () => {
    setShowLetter(true);
    setShowFireworks(true);
    
    letterControls.start({
      y: 0,
      opacity: 1,
      rotate: [20, -10, 0],
      scale: [0.7, 1.15, 1],
      transition: { duration: 1.2, ease: "backOut" }
    });
  };

  const letterText = `Моя любимая,

Мне так стыдно и больно от мысли, что я причинил тебе боль — даже случайно. Ты для меня свет, и я не хочу, чтобы между нами была тень.

Я обещаю быть внимательнее, заботливее и бережнее. Пожалуйста, прости меня. Я люблю тебя больше жизни.

С каждым ударом сердца я думаю о тебе. Ты — мой мир, моё счастье, моя любовь.

Твой навсегда ❤️`;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: isDarkMode
          ? `radial-gradient(ellipse at 50% 50%, #1e1b4b, #0f172a, #000000)`
          : `radial-gradient(ellipse at 50% 50%, #fdf2f8, #fef7ff, #fff1f2)`,
        color: isDarkMode ? '#f1f5f9' : '#1e293b',
        margin: 0,
        padding: 0,
        fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 0.3s ease, color 1.5s ease',
      }}
    >
      {/* Дополнительные декоративные свечения */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: isDarkMode 
              ? `radial-gradient(circle, rgba(${i % 2 ? '168, 85, 247' : '236, 72, 153'}, 0.15), transparent)`
              : `radial-gradient(circle, rgba(${i % 2 ? '236, 72, 153' : '168, 85, 247'}, 0.1), transparent)`,
            pointerEvents: 'none',
            zIndex: 1,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Падающие элементы */}
      {[...Array(16)].map((_, i) => {
        const delay = Math.random() * 20;
        const duration = 25 + Math.random() * 20;
        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const icons = [Heart, Star, Sparkles, Flower, Flower2, Cherry];
        const Icon = icons[i % 6];

        return (
          <motion.div
            key={i}
            style={{
              position: 'fixed',
              left: `${left}%`,
              top: '-80px',
              width: `${size}px`,
              height: `${size}px`,
              opacity: isDarkMode ? 0.7 : 0.5,
              zIndex: 2,
            }}
            animate={{
              y: ['0vh', '120vh'],
              rotate: [0, 360, 720, 1080],
              x: [0, Math.sin(i) * 120, Math.cos(i) * 80, 0],
              scale: [0.8, 1.2, 0.8, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          >
            <Icon 
              style={{ 
                width: '100%', 
                height: '100%', 
                fill: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : 'transparent',
                color: i % 4 === 0 ? '#ec4899' : i % 4 === 1 ? '#a855f7' : i % 4 === 2 ? '#fbbf24' : '#10b981',
                filter: 'drop-shadow(0 0 12px currentColor)'
              }} 
            />
          </motion.div>
        );
      })}

      {/* Фейерверки */}
      {showFireworks && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${20 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
                width: '60px',
                height: '60px',
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 2,
                repeat: 3,
                ease: "easeOut",
                delay: i * 0.2 
              }}
            >
              <Star 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  color: ['#ec4899', '#a855f7', '#fbbf24', '#10b981'][i % 4],
                  fill: 'currentColor',
                  filter: 'drop-shadow(0 0 20px currentColor)'
                }} 
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "backOut" }}
        style={{
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          backdropFilter: 'blur(25px)',
          backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          boxShadow: isDarkMode
            ? '0 15px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 15px 50px rgba(0, 0, 0, 0.25), 0 0 30px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255,255,255,0.9)',
          borderRadius: '1.5rem',
          margin: '1rem auto',
          maxWidth: '96%',
          border: isDarkMode ? '2px solid rgba(168, 85, 247, 0.4)' : '2px solid rgba(236, 72, 153, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.15, 1],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart
              style={{
                color: '#ec4899',
                width: '40px',
                height: '40px',
                filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 1))',
              }}
            />
          </motion.div>
          <motion.strong
            style={{
              fontSize: '2.2rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ec4899, #a855f7, #3b82f6, #10b981, #ec4899)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Извини
          </motion.strong>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ marginLeft: '0.5rem' }}
          >
            <Sparkles style={{ color: '#fbbf24', width: '20px', height: '20px' }} />
          </motion.div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Cherry style={{ 
              color: isDarkMode ? '#f87171' : '#dc2626', 
              width: '24px', 
              height: '24px' 
            }} />
          </motion.div>
          
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.8rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(15px)',
              boxShadow: isDarkMode 
                ? '0 6px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 6px 15px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
              minWidth: '44px',
              minHeight: '44px',
            }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun style={{ color: '#fbbf24', width: '24px', height: '24px' }} />
            ) : (
              <Moon style={{ color: '#475569', width: '24px', height: '24px' }} />
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Main */}
      <main
        style={{
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Текст сверху */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          style={{
            marginBottom: '3rem',
            marginTop: '4rem',
          }}
        >
          <motion.h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: '900',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.02,
              background: 'linear-gradient(135deg, #ec4899, #a855f7, #3b82f6, #10b981, #fbbf24, #ec4899)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.04em',
              textShadow: isDarkMode ? '0 0 30px rgba(236, 72, 153, 0.5)' : '0 0 30px rgba(236, 72, 153, 0.3)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Прости меня
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #ec4899, #a855f7, #ec4899, transparent)',
              margin: '0 auto 1.5rem',
              borderRadius: '2px',
            }}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            style={{
              fontSize: '1.4rem',
              color: isDarkMode ? '#e2e8f0' : '#475569',
              maxWidth: '850px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '400',
            }}
          >
            Это было случайно, во сне... Но я чувствую себя ужасно. 
            Ты — самое важное в моей жизни.
          </motion.p>
        </motion.div>

        {/* Сердце */}
        <motion.div
          onClick={openLetter}
          animate={heartControls}
          whileHover={{ scale: 1.35 }}
          whileTap={{ scale: 0.85 }}
          style={{
            display: 'inline-block',
            cursor: 'pointer',
            margin: '3rem 0 5rem 0',
            position: 'relative',
          }}
        >
          {/* Множественные слои свечения */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                inset: -60 - i * 15,
                background: `radial-gradient(circle, rgba(236, 72, 153, ${0.3 - i * 0.1}), rgba(168, 85, 247, ${0.2 - i * 0.05}), transparent 70%)`,
                borderRadius: '50%',
                filter: `blur(${40 + i * 15}px)`,
                zIndex: -1 - i,
              }}
              animate={{
                scale: [1, 1.3 + i * 0.2, 1],
                opacity: [0.3 - i * 0.1, 0.6 - i * 0.1, 0.3 - i * 0.1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
          
          {/* Орбитальные частицы вокруг сердца */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '16px',
                height: '16px',
                left: '50%',
                top: '50%',
              }}
              animate={{
                rotate: [0, 360],
                x: Math.cos(i * 60 * Math.PI / 180) * 100,
                y: Math.sin(i * 60 * Math.PI / 180) * 100,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2
              }}
            >
              <Star 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  color: ['#ec4899', '#a855f7', '#fbbf24'][i % 3],
                  fill: 'currentColor',
                  filter: 'drop-shadow(0 0 8px currentColor)'
                }} 
              />
            </motion.div>
          ))}
          
          <Heart
            style={{
              width: '160px',
              height: '160px',
              color: '#ec4899',
              fill: '#ec4899',
              filter: 'drop-shadow(0 20px 40px rgba(236, 72, 153, 0.7))',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* Письмо (открывается сразу) */}
        <motion.div
          initial={{ y: 200, opacity: 0, rotate: 25, scale: 0.7 }}
          animate={letterControls}
          style={{
            background: isDarkMode
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.98)',
            padding: '3rem',
            borderRadius: '2rem',
            maxWidth: '800px',
            margin: '3rem auto 0',
            boxShadow: isDarkMode
              ? '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 60px rgba(236, 72, 153, 0.4), inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.1)'
              : '0 30px 60px rgba(0, 0, 0, 0.2), 0 0 60px rgba(236, 72, 153, 0.25), inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(0,0,0,0.05)',
            backdropFilter: 'blur(25px)',
            border: isDarkMode
              ? '2px solid rgba(255, 255, 255, 0.25)'
              : '3px solid rgba(236, 72, 153, 0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Декоративные элементы на письме */}
          <motion.div
            initial={{ x: 150, opacity: 0, rotate: 45 }}
            animate={{ x: 0, opacity: 1, rotate: -12 }}
            transition={{ delay: 1.2, duration: 1, ease: "backOut" }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              width: '50px',
              height: '12px',
              background: 'linear-gradient(90deg, #d97706, #92400e, #451a03)',
              borderRadius: '6px',
              zIndex: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            }}
          />
          
          {/* Дополнительные декоративные цветы */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
            style={{
              position: 'absolute',
              top: '20px',
              left: '25px',
            }}
          >
            <Flower2 style={{ width: '30px', height: '30px', color: '#ec4899' }} />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
          >
            <Sparkles
              style={{
                color: '#fbbf24',
                margin: '0 auto 1.5rem',
                width: '50px',
                height: '50px',
                filter: 'drop-shadow(0 0 15px #fbbf24)',
              }}
            />
          </motion.div>

          {/* Текст письма */}
          <div
            style={{
              lineHeight: '2.2',
              color: isDarkMode ? '#f8fafc' : '#0f172a',
              fontSize: '1.2rem',
              textAlign: 'left',
              fontWeight: '400',
              whiteSpace: 'pre-line',
            }}
          >
            {letterText}
          </div>
          
          {/* Дополнительные декоративные элементы внизу письма */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '0.8rem',
            }}
          >
            {[Heart, Star, Flower].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                <Icon 
                  style={{ 
                    width: '24px', 
                    height: '24px',
                    color: ['#ec4899', '#a855f7', '#10b981'][i],
                    fill: i === 0 ? 'currentColor' : 'none'
                  }} 
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Подвал */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          style={{
            marginTop: '8rem',
            marginBottom: '3rem',
            textAlign: 'center',
          }}
        >
          <motion.p
            style={{
              fontSize: '1.2rem',
              color: isDarkMode ? '#cbd5e1' : '#64748b',
              fontStyle: 'italic',
              fontWeight: '500',
              marginBottom: '1.5rem',
            }}
            animate={{
              textShadow: [
                '0 0 10px rgba(236, 72, 153, 0.3)',
                '0 0 20px rgba(236, 72, 153, 0.5)',
                '0 0 10px rgba(236, 72, 153, 0.3)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Каждое утро с тобой — подарок, который я хочу ценить
          </motion.p>
          
          {/* Красивая декоративная линия из сердечек */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 360],
                  y: [0, -12, 0]
                }}
                transition={{ 
                  duration: 2 + i * 0.2, 
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                <Heart
                  style={{
                    width: '16px',
                    height: '16px',
                    color: ['#ec4899', '#a855f7', '#fbbf24', '#10b981', '#3b82f6'][i % 5],
                    fill: 'currentColor',
                    filter: 'drop-shadow(0 0 8px currentColor)',
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Дополнительная романтическая фраза */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            style={{
              fontSize: '1rem',
              color: isDarkMode ? '#a1a1aa' : '#71717a',
              fontStyle: 'italic',
              marginTop: '2rem',
              fontWeight: '300',
            }}
          >
            "Любовь — это когда даже извинение становится признанием"
          </motion.p>
        </motion.footer>
      </main>
      
      {/* Дополнительные декоративные элементы по углам */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            [i < 2 ? 'top' : 'bottom']: '15px',
            [i % 2 === 0 ? 'left' : 'right']: '15px',
            width: '40px',
            height: '40px',
            zIndex: 5,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1,
          }}
        >
          {[Sparkles, Star, Flower, Cherry][i] && 
            React.createElement([Sparkles, Star, Flower, Cherry][i], {
              style: {
                width: '100%',
                height: '100%',
                color: ['#fbbf24', '#a855f7', '#10b981', '#f87171'][i],
                filter: 'drop-shadow(0 0 10px currentColor)'
              }
            })
          }
        </motion.div>
      ))}
    </div>
  );
}