import { useState } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);

  const MOCK_PRODUCTS = [
    { id: 1, nome: "Carrinho Speed Racing", preco: 9.90, img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400" },
    { id: 2, nome: "Boneca Fashion Kids", preco: 15.00, img: "https://images.unsplash.com/photo-1559441165-27663a75871b?w=400" },
    { id: 3, nome: "Kit Cozinha 6 Peças", preco: 19.90, img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400" },
    { id: 4, nome: "Balde Multiuso 10L", preco: 7.90, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400" },
    { id: 5, nome: "Conjunto Copos (6un)", preco: 12.50, img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=400" },
    { id: 6, nome: "Organizador Gaveta", preco: 5.90, img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400" },
    { id: 7, nome: "Kit Ferramentas Brinquedo", preco: 14.90, img: "https://images.unsplash.com/photo-1530124566582-aa3751f5ba3c?w=400" },
    { id: 8, nome: "Pote Hermético Médio", preco: 8.50, img: "https://images.unsplash.com/photo-1581572866623-282540b02446?w=400" },
    { id: 9, nome: "Luminária de Mesa", preco: 25.00, img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400" },
    { id: 10, nome: "Tapete Banheiro Soft", preco: 10.00, img: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400" },
  ];

  const total = cart.reduce((acc, i) => acc + i.preco, 0);

  const finalizarPedido = () => {
    if (cart.length === 0) return;
    const listaProdutos = cart.map(item => `- ${item.nome}: R$ ${item.preco.toFixed(2)}`).join('%0A');
    const totalPedido = total.toFixed(2);
    const mensagem = `*NOVO PEDIDO - DINIZ STORE*%0A%0A` +
                     `*Produtos:*%0A${listaProdutos}%0A%0A` + 
                     `*Total:* R$ ${totalPedido}%0A%0A` +
                     `👉 _Favor confirmar a disponibilidade para entrega em Santa Rita!_`;

    const seuNumero = "5519999999999"; 
    window.open(`https://api.whatsapp.com/send?phone=${seuNumero}&text=${mensagem}`, '_blank');
    setCart([]);
  };

  const removerDoCarrinho = (indexParaRemover: number) => {
    setCart(cart.filter((_, index) => index !== indexParaRemover));
  };

  return (
    <div>
      <nav className="nav-pills">
        <h2 className="nav-title">DINIZ STORE</h2> {/* AQUI A CLASSE QUE CRIAMOS */}
        <div style={{display: 'flex', gap: '8px'}}>
          <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}>🏠 HOME</button>
          <button className={tab === 'vendas' ? 'active' : ''} onClick={() => setTab('vendas')}>🛒 COMPRAR</button>
          <button className={tab === 'contato' ? 'active' : ''} onClick={() => setTab('contato')}>💬 WHATSAPP</button>
          <button className={tab === 'admin' ? 'active' : ''} onClick={() => setTab('admin')}>⚙️ ADMIN</button>
        </div>
      </nav>

      <div className="container">
        {tab === 'home' && (
          <section className="fade-in">
            <div className="hero-retail">
              <h2>PROMOÇÕES DA SEMANA</h2>
              <p>Economia real em Santa Rita do Passa Quatro!</p>
              <button className="btn-finalize" style={{width: '280px'}} onClick={() => setTab('vendas')}>ABRIR VITRINE AGORA</button>
            </div>

            <div className="info-bar-grid">
              <div className="info-item-card">
                <h4>📍 Onde Estamos</h4>
                <p>Rua do Comércio, 123 - Centro<br/>Santa Rita do Passa Quatro-SP</p>
              </div>
              <div className="info-item-card">
                <h4>⏰ Funcionamento</h4>
                <p>Segunda a Sexta: 08:00 às 18:00<br/>Sábados: 08:00 às 13:00</p>
              </div>
              <div className="info-item-card">
                <h4>🚚 Entrega Expressa</h4>
                <p>Receba em casa em até 1 hora<br/>dentro do perímetro urbano.</p>
              </div>
            </div>

            <div className="feedback-grid">
               <div className="feedback-card"><p>"Melhores preços da cidade!"</p><strong>- Ana Maria, Santa Rita</strong></div>
               <div className="feedback-card"><p>"Comprei pelo site e retirei rapidinho."</p><strong>- Pedro S., Centro</strong></div>
            </div>
          </section>
        )}

        {tab === 'vendas' && (
          <div className="layout-vendas fade-in">
            <div className="products-grid">
              {MOCK_PRODUCTS.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.img} className="product-img" alt={p.nome} />
                  <h3>{p.nome}</h3>
                  <div className="price-tag">R$ {p.preco.toFixed(2)}</div>
                  <button className="btn-finalize" style={{padding: '10px', fontSize: '0.9rem'}} onClick={() => setCart([...cart, p])}>
                    ADICIONAR +
                  </button>
                </div>
              ))}
            </div>

            <aside className="cart-sidebar">
              <h3>🛒 Minha Sacola</h3>
              <div className="cart-list">
                {cart.length === 0 ? <p style={{textAlign: 'center', color: '#94a3b8', padding: '20px 0'}}>Sacola Vazia</p> : 
                  cart.map((item, idx) => (
                    <div key={idx} className="cart-item" onClick={() => removerDoCarrinho(idx)} style={{cursor: 'pointer'}} title="Clique para remover">
                      <span>{item.nome}</span>
                      <strong>R$ {item.preco.toFixed(2)} ❌</strong>
                    </div>
                  ))
                }
              </div>
              <div className="cart-total-box">
                <span style={{fontWeight: 700, color: '#166534'}}>TOTAL A PAGAR:</span>
                <span className="total-amount">R$ {total.toFixed(2)}</span>
              </div>
              <button 
                className="btn-finalize" 
                disabled={cart.length === 0} 
                onClick={finalizarPedido}
                style={{background: cart.length > 0 ? 'var(--whatsapp)' : '#cbd5e1'}}
              >
                FINALIZAR NO WHATSAPP
              </button>
            </aside>
          </div>
        )}

        {tab === 'contato' && (
          <section className="fade-in" style={{textAlign: 'center', padding: '80px 0'}}>
            <h2 style={{fontSize: '2.5rem'}}>Fale com o Gerente</h2>
            <p style={{color: '#64748b', marginBottom: '30px'}}>Tire suas dúvidas agora mesmo pelo WhatsApp.</p>
            <button className="btn-whatsapp" onClick={() => window.open('https://wa.me/5519999999999', '_blank')}>
              🟢 CHAMAR NO WHATSAPP
            </button>
          </section>
        )}

        {tab === 'admin' && (
          <section className="fade-in" style={{maxWidth: '600px', margin: '40px auto'}}>
            <div className="cart-sidebar">
              <h2>⚙️ Painel de Gestão</h2>
              <p>Injete novas imagens e promoções na vitrine.</p>
              <input type="text" placeholder="Nome do Produto" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
              <input type="number" placeholder="Preço" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
              <input type="text" placeholder="URL da Imagem" style={{width: '100%', padding: '10px', margin: '10px 0'}} />
              <button className="btn-finalize">PUBLICAR PROMOÇÃO</button>
            </div>
          </section>
        )}
      </div>

      <footer className="footer-premium">
        <p><strong>DINIZ STORE</strong> - Varejo Inteligente em Santa Rita-SP</p>
        <div className="social-links">
          <a href="#" className="social-icon">📸 INSTAGRAM</a>
          <a href="#" className="social-icon">🔵 FACEBOOK</a>
          <a href="#" className="social-icon">✈️ TELEGRAM</a>
        </div>
        <p style={{fontSize: '0.8rem', marginTop: '20px', opacity: 0.6}}>
          © 2026 Solução desenvolvida pela <strong>Agência IA Diniz</strong>
        </p>
      </footer>
    </div>
  )
}

export default App
            
