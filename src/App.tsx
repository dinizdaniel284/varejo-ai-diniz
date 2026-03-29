import { useState } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);

  const PRODUCTS = [
    { id: 1, nome: "Copo Térmico 500ml", preco: 15.90, img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=400" },
    { id: 2, nome: "Kit Ferramentas 12pçs", preco: 29.90, img: "https://images.unsplash.com/photo-1530124566582-aa3751f5ba3c?w=400" },
    { id: 3, nome: "Boneca Soft Kids", preco: 19.00, img: "https://images.unsplash.com/photo-1559441165-27663a75871b?w=400" },
    { id: 4, nome: "Organizador de Mesa", preco: 8.50, img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400" },
  ];

  const total = cart.reduce((acc, i) => acc + i.preco, 0);

  const enviarWhatsApp = () => {
    const lista = cart.map(i => `- ${i.nome}`).join('%0A');
    window.open(`https://wa.me/5519999999999?text=Olá! Quero pedir:%0A${lista}%0A*Total: R$ ${total.toFixed(2)}*`, '_blank');
  };

  return (
    <div className="app-mobile">
      <nav className="nav-tabs">
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}>LOJA</button>
        <button className={tab === 'cart' ? 'active' : ''} onClick={() => setTab('cart')}>CARRINHO ({cart.length})</button>
        <button className={tab === 'admin' ? 'active' : ''} onClick={() => setTab('admin')}>ADMIN</button>
      </nav>

      {tab === 'home' && (
        <section>
          <div className="hero-premium">
            <p style={{background: '#ff3b30', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900}}>OFERTAS DE HOJE</p>
            <h2>DINIZ STORE<br/>SANTA RITA</h2>
            <p>Tudo para sua casa com preço de 1,99</p>
          </div>

          <div className="container">
             <div className="product-grid">
               {PRODUCTS.map(p => (
                 <div key={p.id} className="product-card">
                   <img src={p.img} alt={p.nome} />
                   <h3 style={{fontSize: '0.9rem', marginTop: '10px'}}>{p.nome}</h3>
                   <div className="price-tag">R$ {p.preco.toFixed(2)}</div>
                   <button className="btn-add" onClick={() => setCart([...cart, p])}>ADICIONAR</button>
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}

      {tab === 'cart' && (
        <div className="container fade-in">
          <div className="sidebar-content">
            <h2 style={{marginBottom: '20px'}}>🛒 Sua Sacola</h2>
            {cart.length === 0 ? <p>Seu carrinho está vazio.</p> : (
              <>
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <span>{item.nome}</span>
                    <strong>R$ {item.preco.toFixed(2)}</strong>
                  </div>
                ))}
                <div style={{marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '10px'}}>
                  <h3>Total: R$ {total.toFixed(2)}</h3>
                  <button className="btn-add" style={{background: '#25d366', marginTop: '15px'}} onClick={enviarWhatsApp}>
                    FINALIZAR NO WHATSAPP
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {tab === 'admin' && (
        <div className="container">
          <div className="sidebar-content">
            <h2>⚙️ Painel Admin</h2>
            <p style={{color: '#666', marginBottom: '20px'}}>Gerenciar estoque e preços</p>
            <input type="text" placeholder="Nome do Produto" style={{width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd'}} />
            <input type="number" placeholder="Preço" style={{width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd'}} />
            <button className="btn-add">CADASTRAR PRODUTO</button>
          </div>
        </div>
      )}

      {/* FEEDBACK & INFO (No final da home) */}
      {tab === 'home' && (
        <div className="container" style={{paddingBottom: '100px'}}>
           <div className="sidebar-content" style={{background: '#000', color: '#fff', textAlign: 'center'}}>
             <h4>📍 Onde estamos</h4>
             <p style={{opacity: 0.8, fontSize: '0.85rem'}}>Rua do Comércio, 123 - Centro<br/>Santa Rita do Passa Quatro - SP</p>
             <p style={{marginTop: '10px', fontSize: '0.8rem'}}>⏰ Aberto até as 18h00</p>
           </div>
        </div>
      )}

      <a href="https://wa.me/5519999999999" className="btn-float">💬</a>
    </div>
  )
}

export default App
                                                                     
