import { Heart, Sparkles, Sun, Moon, Star } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const heartControls = useAnimation();
  const envelopeControls = useAnimation();
  const letterControls = useAnimation();

  // Анимация сердца
  useEffect(() => {
    heartControls.start({
      scale: [1, 1.1, 1],
      y: [0, -20, 0],
      rotate: [-5, 5, -5],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      },
    });
  }, [heartControls]);

  // Запуск "печатания" после появления письма
  useEffect(() => {
    if (showLetter) {
      const timer = setTimeout(() => {
        setStartTyping(true);
      }, 300); // Небольшая задержка для гарантии рендера
      return () => clearTimeout(timer);
    }
  }, [showLetter]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const openEnvelope = async () => {
    setShowEnvelope(true);
    
    // Анимация сердца
    await heartControls.start({ scale: 1.4, y: -30, rotate: 0 });
    
    // Открытие конверта
    setTimeout(() => {
      envelopeControls.start({
        rotateX: 180,
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    }, 500);

    // Появление письма
    setTimeout(() => {
      setShowLetter(true);
      letterControls.start({
        y: 0,
        opacity: 1,
        rotate: [10, -5, 0],
        transition: { duration: 0.8, ease: "backOut" }
      });
    }, 1300);
  };

  const letterText = `Моя любимая,

Мне так стыдно и больно от мысли, что я причинил тебе боль — даже случайно. Ты для меня свет, и я не хочу, чтобы между нами была тень.

Я обещаю быть внимательнее, заботливее и бережнее. Пожалуйста, прости меня. Я люблю тебя больше жизни.

Твой навсегда ❤️`;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: isDarkMode
          ? 'radial-gradient(circle at center, #0f172a, #1e1b4b)'
          : 'radial-gradient(circle at center, #fffaf4, #fdf3f8)',
        color: isDarkMode ? '#e0e7ff' : '#1e1b4b',
        margin: 0,
        padding: 0,
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 2s ease, color 1s ease',
      }}
    >
      {/* Динамическое свечение */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: isDarkMode
            ? 'radial-gradient(600px circle at center, rgba(147, 51, 234, 0.15), transparent 50%)'
            : 'radial-gradient(600px circle at center, rgba(236, 72, 153, 0.1), transparent 50%)',
          zIndex: 1,
        }}
      />

      {/* Падающие элементы */}
      {[...Array(6)].map((_, i) => {
        const delay = Math.random() * 10;
        const duration = 15 + Math.random() * 10;
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;

        return (
          <motion.div
            key={i}
            style={{
              position: 'fixed',
              left: `${left}%`,
              top: '-50px',
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.4,
              zIndex: 2,
            }}
            animate={{
              y: ['0vh', '100vh'],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          >
            <Heart style={{ width: '100%', height: '100%', fill: '#ec4899', color: '#ec4899' }} />
          </motion.div>
        );
      })}

      {/* Header */}
      <header
        style={{
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          backdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          boxShadow: isDarkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.6)'
            : '0 8px 32px rgba(0, 0, 0, 0.15)',
          borderRadius: '1.5rem',
          margin: '1rem auto',
          maxWidth: '92%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Heart
            style={{
              color: '#ec4899',
              width: '32px',
              height: '32px',
              filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))',
            }}
          />
          <strong
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #ec4899, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Извини
          </strong>
        </div>
        <button
          onClick={toggleDarkMode}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.75rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
          }}
        >
          {isDarkMode ? (
            <Sun style={{ color: '#fbbf24', width: '26px', height: '26px' }} />
          ) : (
            <Moon style={{ color: '#374151', width: '26px', height: '26px' }} />
          )}
        </button>
      </header>

      {/* Main */}
      <main
        style={{
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '900px',
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            marginBottom: '2rem',
            marginTop: '4rem',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
              fontWeight: '900',
              margin: '0 0 1.2rem 0',
              lineHeight: 1.1,
              background: 'linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Прости меня
          </h1>
          <p
            style={{
              fontSize: '1.4rem',
              color: isDarkMode ? '#cbd5e1' : '#475569',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.9',
            }}
          >
            Это было случайно, во сне... Но я чувствую себя ужасно. 
            Ты — самое важное в моей жизни.
          </p>
        </motion.div>

        {/* Сердце */}
        <motion.div
          onClick={openEnvelope}
          animate={heartControls}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-block',
            cursor: 'pointer',
            margin: '3rem 0 5rem 0',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -40,
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              zIndex: -1,
            }}
          />
          <Heart
            style={{
              width: '150px',
              height: '150px',
              color: '#ec4899',
              fill: '#ec4899',
              filter: 'drop-shadow(0 20px 30px rgba(236, 72, 153, 0.5))',
            }}
          />
        </motion.div>

        {/* Конверт */}
        {showEnvelope && (
          <motion.div
            style={{
              width: '300px',
              height: '180px',
              perspective: '1000px',
              margin: '2rem auto',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: isDarkMode ? '#374151' : '#f87171',
                position: 'absolute',
                borderRadius: '1rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
              }}
              animate={envelopeControls}
              initial={{ rotateX: 0 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '50%',
                  background: isDarkMode ? '#2d3748' : '#ef4444',
                  position: 'absolute',
                  top: 0,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Heart
                  style={{
                    width: '60px',
                    height: '60px',
                    fill: '#ec4899',
                    color: '#ec4899',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Письмо */}
        {showLetter && (
          <motion.div
            initial={{ y: 100, opacity: 0, rotate: 10 }}
            animate={letterControls}
            style={{
              background: isDarkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'white',
              padding: '3rem',
              borderRadius: '1.5rem',
              maxWidth: '600px',
              margin: '3rem auto 0',
              boxShadow: isDarkMode
                ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(236, 72, 153, 0.2)'
                : '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(236, 72, 153, 0.1)',
              backdropFilter: 'blur(10px)',
              border: isDarkMode
                ? '1px solid rgba(255, 255, 255, 0.15)'
                : '1px solid #f87171',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Перо */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                width: '40px',
                height: '8px',
                background: '#d97706',
                borderRadius: '4px',
                transform: 'rotate(-5deg)',
                zIndex: 2,
              }}
            />

            <Sparkles
              style={{
                color: '#fbbf24',
                margin: '0 auto 1.5rem',
                width: '40px',
                height: '40px',
              }}
            />

            {/* Текст */}
            <div
              style={{
                lineHeight: '2',
                color: isDarkMode ? '#e0e7ff' : '#334155',
                fontSize: '1.15rem',
                textAlign: 'left',
                fontWeight: 300,
                whiteSpace: 'pre-line',
              }}
            >
              {startTyping ? (
                letterText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.03, delay: i * 0.03 }}
                  >
                    {char === '❤' ? (
                      <span style={{ color: '#ec4899', fontSize: '1.2em' }}>❤</span>
                    ) : (
                      char
                    )}
                  </motion.span>
                ))
              ) : (
                <span style={{ opacity: 0 }}>М</span> // Лёгкая заглушка для рендера
              )}
            </div>
          </motion.div>
        )}

        <footer
          style={{
            marginTop: '6rem',
            marginBottom: '2rem',
            fontSize: '1.1rem',
            color: isDarkMode ? '#64748b' : '#94a3b8',
            fontStyle: 'italic',
          }}
        >
          Каждое утро с тобой — подарок, который я хочу ценить
        </footer>
      </main>
    </div>
  );
}