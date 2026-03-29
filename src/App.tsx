import { useState } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home')
  const [cart, setCart] = useState<any[]>([])
  const [aiMessage, setAiMessage] = useState("Me diga o que você procura 👇")
  const [query, setQuery] = useState("")

  const PRODUCTS = [
    { id: 1, nome: "Copo Térmico 500ml", preco: 15.90, img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=400" },
    { id: 2, nome: "Kit Ferramentas 12pçs", preco: 29.90, img: "https://images.unsplash.com/photo-1530124566582-aa3751f5ba3c?w=400" },
    { id: 3, nome: "Boneca Soft Kids", preco: 19.00, img: "https://images.unsplash.com/photo-1559441165-27663a75871b?w=400" },
    { id: 4, nome: "Organizador de Mesa", preco: 8.50, img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400" },
  ]

  const handleAI = () => {
    const q = query.toLowerCase()

    if (q.includes("copo")) {
      setAiMessage("Temos copos térmicos por R$15,90! Quer ver agora na vitrine?")
    } else if (q.includes("ferramenta")) {
      setAiMessage("Kit de ferramentas por R$29,90! Ótima opção 👌")
    } else if (q.includes("brinquedo")) {
      setAiMessage("Temos brinquedos a partir de R$19! Dá uma olhada na loja 😉")
    } else {
      setAiMessage("Temos produtos a partir de R$1,99! Navegue pela vitrine 👇")
    }

    setQuery("")
  }

  return (
    <div className="container">

      {/* NAV */}
      <nav className="main-nav">
        <button className={`nav-btn ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>
          Início
        </button>

        <button className={`nav-btn ${tab === 'shop' ? 'active' : ''}`} onClick={() => setTab('shop')}>
          Loja
        </button>

        <button className={`nav-btn ${tab === 'cart' ? 'active' : ''}`} onClick={() => setTab('cart')}>
          Carrinho ({cart.length})
        </button>
      </nav>

      {/* HOME */}
      {tab === 'home' && (
        <div className="fade-in">

          {/* BANNER */}
          <header className="main-banner">
            <h1 className="banner-title">
              🔥 OFERTAS TODOS OS DIAS
            </h1>

            <p className="banner-sub">
              Tudo a partir de R$1,99 perto de você!
            </p>

            <button
              className="nav-btn active"
              style={{ marginTop: '15px' }}
              onClick={() => setTab('shop')}
            >
              VER PROMOÇÕES
            </button>
          </header>

          {/* IA */}
          <section className="section">
            <h2 className="section-title">🤖 Compre com ajuda da IA</h2>

            <div className="ai-cloud-chat">
              <p style={{ fontSize: '0.9rem' }}>
                <strong>Diniz IA:</strong> {aiMessage}
              </p>

              <div className="ai-input-group">
                <input
                  className="ai-input"
                  placeholder="Ex: Tem copo?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <button className="nav-btn active" onClick={handleAI}>
                  OK
                </button>
              </div>
            </div>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/55SEUNUMERO"
              className="whatsapp-btn"
            >
              📲 Falar com atendente agora
            </a>
          </section>

          {/* DESTAQUES */}
          <section className="section">
            <h2 className="section-title">🔥 Destaques</h2>

            <div className="horizontal-scroll">
              {PRODUCTS.slice(0, 3).map(p => (
                <div key={p.id} className="product-card">
                  <img src={p.img} alt={p.nome} />

                  <p className="product-name">{p.nome}</p>

                  <p className="product-price">
                    R$ {p.preco.toFixed(2)}
                  </p>

                  <button
                    className="btn-buy"
                    onClick={() => setCart([...cart, { ...p, cid: Math.random() }])}
                  >
                    ADICIONAR
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* INFO */}
          <section className="section" style={{ fontSize: '0.85rem' }}>
            <h2 className="section-title">📍 Informações</h2>

            <p><strong>Endereço:</strong> Rua do Comércio, 123</p>
            <p><strong>Cidade:</strong> Santa Rita do Passa Quatro</p>
            <p><strong>Horário:</strong> Seg a Sáb - 08h às 18h</p>
          </section>

        </div>
      )}

      {/* LOJA */}
      {tab === 'shop' && (
        <div className="fade-in" style={{ paddingTop: '15px' }}>
          <section className="section">
            <h2 className="section-title">🛍️ Vitrine Completa</h2>

            <div className="shop-full-grid">
              {PRODUCTS.map(p => (
                <div key={p.id} className="product-card">
                  <img src={p.img} alt={p.nome} />

                  <p className="product-name">{p.nome}</p>

                  <p className="product-price">
                    R$ {p.preco.toFixed(2)}
                  </p>

                  <button
                    className="btn-buy"
                    onClick={() => setCart([...cart, { ...p, cid: Math.random() }])}
                  >
                    ADICIONAR
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* CARRINHO */}
      {tab === 'cart' && (
        <section className="section fade-in" style={{ marginTop: '20px' }}>
          <h2 className="section-title">🛒 Sua Sacola</h2>

          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>
              Sua sacola está vazia.
            </p>
          ) : (
            <>
              {cart.map(i => (
                <div
                  key={i.cid}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid #eee',
                    fontSize: '0.9rem'
                  }}
                >
                  <span>{i.nome}</span>

                  <button
                    style={{
                      color: 'red',
                      border: 'none',
                      background: 'none',
                      fontWeight: 700
                    }}
                    onClick={() => setCart(cart.filter(x => x.cid !== i.cid))}
                  >
                    Remover
                  </button>
                </div>
              ))}

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>
                  Total: R$ {cart.reduce((a, b) => a + b.preco, 0).toFixed(2)}
                </h3>

                <button
                  className="whatsapp-btn"
                >
                  Finalizar no WhatsApp
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center',
        padding: '30px 0',
        opacity: 0.5,
        fontSize: '0.7rem'
      }}>
        Agência IA Diniz - 2026
      </footer>

    </div>
  )
}

export default App
