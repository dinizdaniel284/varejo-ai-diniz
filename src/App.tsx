import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // Efeito para sumir o aviso de "Adicionado" após 2 segundos
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const PRODUCTS = [
    { id: 1, nome: "Copo Térmico 500ml", preco: 15.90, img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=400" },
    { id: 2, nome: "Kit Ferramentas 12pçs", preco: 29.90, img: "https://images.unsplash.com/photo-1530124566582-aa3751f5ba3c?w=400" },
    { id: 3, nome: "Boneca Soft Kids", preco: 19.00, img: "https://images.unsplash.com/photo-1559441165-27663a75871b?w=400" },
    { id: 4, nome: "Organizador de Mesa", preco: 8.50, img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400" },
  ];

  const adicionarAoCarrinho = (p: any) => {
    setCart([...cart, { ...p, cartId: Math.random() }]); // Adiciona ID único para remoção precisa
    setShowFeedback(true);
  };

  const removerDoCarrinho = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const total = cart.reduce((acc, i) => acc + i.preco, 0);

  const finalizarWhatsApp = () => {
    const lista = cart.map(i => `- ${i.nome} (R$ ${i.preco.toFixed(2)})`).join('%0A');
    const msg = `*NOVO PEDIDO - DINIZ STORE*%0A%0A${lista}%0A%0A*Total: R$ ${total.toFixed(2)}*%0A%0A📍 Entrega em Santa Rita.`;
    window.open(`https://wa.me/5519999999999?text=${msg}`, '_blank');
  };

  return (
    <div className="app-mobile">
      {showFeedback && <div className="add-feedback">✅ Adicionado à sacola!</div>}

      <nav className="nav-tabs">
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}>🔥 OFERTAS</button>
        <button className={tab === 'cart' ? 'active' : ''} onClick={() => setTab('cart')}>
          🛒 SACOLA {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
        <button className={tab === 'admin' ? 'active' : ''} onClick={() => setTab('admin')}>⚙️ PAINEL</button>
      </nav>

      {tab === 'home' && (
        <section className="fade-in">
          <div className="hero-premium">
             <p style={{background: 'var(--accent)', padding: '2px 10px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 900}}>BARATO DE VERDADE</p>
             <h2>OFERTAS DO DIA</h2>
             <p>Preço de 1,99 em Santa Rita-SP</p>
          </div>

          <div className="container">
            <div className="product-grid">
              {PRODUCTS.map(p => (
                <div key={p.id} className="product-card">
                  <img src={p.img} alt={p.nome} />
                  <div className="product-info-box">
                    <h3>{p.nome}</h3>
                    <div className="price-tag">R$ {p.preco.toFixed(2)}</div>
                    <button className="btn-add" onClick={() => adicionarAoCarrinho(p)}>ADICIONAR +</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'cart' && (
        <div className="container fade-in">
          <div className="sidebar-content">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2 style={{margin: 0}}>🛒 Sua Sacola</h2>
              <button onClick={() => setTab('home')} style={{background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700}}>+ Itens</button>
            </div>

            {cart.length === 0 ? (
              <div style={{textAlign: 'center', padding: '40px 0'}}>
                <p style={{color: '#8e8e93'}}>Sua sacola está vazia.</p>
                <button className="btn-add" style={{marginTop: '15px'}} onClick={() => setTab('home')}>VER PRODUTOS</button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.nome}</span>
                      <span className="cart-item-price">R$ {item.preco.toFixed(2)}</span>
                    </div>
                    <button className="btn-remove" onClick={() => removerDoCarrinho(item.cartId)}>Remover</button>
                  </div>
                ))}
                
                <div style={{marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '15px'}}>
                   <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                      <span>Subtotal:</span>
                      <strong>R$ {total.toFixed(2)}</strong>
                   </div>
                   <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--whatsapp)', fontWeight: 700}}>
                      <span>Entrega (Santa Rita):</span>
                      <span>GRÁTIS</span>
                   </div>
                   <h2 style={{marginTop: '15px', textAlign: 'center', fontSize: '1.8rem'}}>Total: R$ {total.toFixed(2)}</h2>
                </div>

                <button className="btn-zap-main" style={{marginTop: '20px'}} onClick={finalizarWhatsApp}>
                  FINALIZAR PEDIDO VIA WHATSAPP
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {tab === 'admin' && (
        <div className="container fade-in">
          <div className="sidebar-content">
            <h2>⚙️ Gestão da Loja</h2>
            <p style={{fontSize: '0.8rem', color: '#666', marginBottom: '20px'}}>Controle total do seu catálogo Agência IA Diniz</p>
            
            <div className="admin-form">
               <label style={{fontSize: '0.8rem', fontWeight: 700}}>Nome do Produto</label>
               <input type="text" className="admin-input" placeholder="Ex: Panela de Pressão" />
               <label style={{fontSize: '0.8rem', fontWeight: 700}}>Preço (R$)</label>
               <input type="number" className="admin-input" placeholder="0.00" />
               <button className="btn-add" style={{marginTop: '10px'}}>SALVAR PRODUTO</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'home' && (
         <footer style={{textAlign: 'center', padding: '40px 20px 100px', opacity: 0.6, fontSize: '0.75rem'}}>
            <p><strong>DINIZ STORE 1:99</strong></p>
            <p>Rua do Comércio, 123 - Centro | Santa Rita-SP</p>
            <p style={{marginTop: '10px'}}>Powered by Agência IA Diniz</p>
         </footer>
      )}

      <a href="https://wa.me/5519999999999" className="btn-float">💬</a>
    </div>
  )
}

export default App
        
