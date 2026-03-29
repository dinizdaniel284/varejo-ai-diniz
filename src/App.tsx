import { useState } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home');

  const CATEGORIES = [
    { n: 'Brinquedos', i: '🎠' },
    { n: 'Utilidades', i: '🛍️' },
    { n: 'Doces', i: '🍬' },
    { n: 'Presentes', i: '🎁' },
    { n: 'Promoções', i: '💥' }
  ];

  const PRODUCTS = [
    { id: 1, n: "Kit 3 Copos Vidro", p: "5,99", img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=400" },
    { id: 2, n: "Boneca Articulada", p: "15,00", img: "https://images.unsplash.com/photo-1559441165-27663a75871b?w=400" },
    { id: 3, n: "Carrinho Speed", p: "9,90", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400" },
    { id: 4, n: "Pote Hermético", p: "7,50", img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400" }
  ];

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="logo">LOJA 1:99 <span style={{color: 'var(--secondary)'}}>SR</span></div>
        <a href="#" className="btn-header-zap">WhatsApp</a>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Tudo que você precisa por preços que cabem no bolso!</h2>
        <p>Ofertas todos os dias direto em Santa Rita do Passa Quatro.</p>
        <div className="hero-btns">
          <button className="btn-hero btn-promo" onClick={() => document.getElementById('ofertas')?.scrollIntoView()}>VER PROMOÇÕES</button>
          <button className="btn-hero btn-ia" onClick={() => setTab('admin')}>FALAR COM IA</button>
        </div>
      </section>

      {/* CATEGORIAS */}
      <h3 className="section-title">CATEGORIAS</h3>
      <div className="cat-grid">
        {CATEGORIES.map(c => (
          <div key={c.n} className="cat-card">
            <span>{c.i}</span>
            <p style={{fontSize: '0.7rem', fontWeight: 800}}>{c.n.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {/* OFERTA DO DIA */}
      <div className="oferta-dia" id="ofertas">
        <div className="oferta-badge">🔥 OFERTA DO DIA 🔥</div>
        <img src={PRODUCTS[0].img} style={{width: '80px', borderRadius: '10px'}} alt="Oferta" />
        <div>
          <h4 style={{fontSize: '0.9rem'}}>{PRODUCTS[0].n}</h4>
          <p className="prod-price">R$ {PRODUCTS[0].p}</p>
          <p style={{fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)'}}>⚠️ Restam poucas unidades!</p>
        </div>
      </div>

      {/* PRODUTOS */}
      <h3 className="section-title">OFERTAS DA SEMANA</h3>
      <div className="prod-grid">
        {PRODUCTS.map(p => (
          <div key={p.id} className="prod-card">
            <img src={p.img} className="prod-img" alt={p.n} />
            <div className="prod-info">
              <h4>{p.n}</h4>
              <p className="prod-price">R$ {p.p}</p>
              <button className="btn-reservar">RESERVAR ZAP</button>
            </div>
          </div>
        ))}
      </div>

      {/* DIFERENCIAL IA */}
      <section className="ia-box">
        <h3 style={{color: 'var(--secondary)'}}>💬 Atendimento IA</h3>
        <p style={{fontSize: '0.9rem', margin: '15px 0'}}>Dúvidas sobre estoque ou promoções? Nossa IA responde na hora!</p>
        <div style={{background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', marginBottom: '15px', fontSize: '0.8rem'}}>
          "Tem brinquedo barato hoje?"
        </div>
        <button className="btn-hero btn-promo" style={{width: '100%'}}>PERGUNTAR AGORA</button>
      </section>

      {/* SOBRE */}
      <section className="container" style={{padding: '40px 20px', textAlign: 'center'}}>
        <h3 className="section-title">NOSSA HISTÓRIA</h3>
        <p style={{fontSize: '0.9rem', lineHeight: '1.6'}}>Desde 2010 atendendo Santa Rita do Passa Quatro com carinho. Mais de 5.000 clientes satisfeitos com qualidade e economia real.</p>
      </section>

      {/* DEPOIMENTOS */}
      <div className="depoimentos">
        <div className="dep-card">"Achei tudo muito rápido! Preço imbatível."<br/><strong>- Ana Silva</strong></div>
        <div className="dep-card">"Adorei os preços, economizei muito!"<br/><strong>- Marcos R.</strong></div>
        <div className="dep-card">"Muito prático comprar pelo site."<br/><strong>- Carla M.</strong></div>
      </div>

      {/* LOCALIZAÇÃO */}
      <section style={{background: var(--white), padding: '40px 20px', textAlign: 'center'}}>
        <h3 className="section-title">ONDE ESTAMOS</h3>
        <p>📍 Rua Central, 123 - Centro<br/>Santa Rita do Passa Quatro - SP</p>
        <p style={{marginTop: '10px', fontWeight: 700}}>⏰ Seg a Sáb: 08h às 18h</p>
        <button className="btn-reservar" style={{background: var(--dark), marginTop: '15px'}}>COMO CHEGAR</button>
      </section>

      {/* FOOTER */}
      <footer style={{background: var(--dark), color: 'white', padding: '40px 20px', textAlign: 'center'}}>
        <p><strong>LOJA 1:99 SANTA RITA</strong></p>
        <p style={{fontSize: '0.7rem', opacity: 0.6, marginTop: '10px'}}>© 2026 Todos os direitos reservados.<br/>Powered by Agência IA Diniz</p>
      </footer>

      {/* ZAP FLUTUANTE */}
      <a href="#" className="btn-float" style={{
        position: 'fixed', bottom: '20px', right: '20px', 
        background: 'var(--whatsapp)', color: 'white', width: '60px', height: '60px', 
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', textDecoration: 'none'
      }}>💬</a>
    </div>
  )
}

export default App
        
