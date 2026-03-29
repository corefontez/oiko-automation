# Oiko Automation — Design System

Sistema de design da Oiko Automation. Fonte única de verdade para todos os valores visuais, componentes e padrões da interface.

---

## Estrutura de arquivos

```
oiko-automation/
├── index.html              # Landing page principal
├── css/
│   ├── tokens.css          # Variáveis CSS (cores, tipografia, espaçamento...)
│   ├── base.css            # Reset, classes tipográficas, reveal animation
│   ├── components.css      # Componentes reutilizáveis (botões, cards, FAQ...)
│   └── layout.css          # Container, grids, seções, hero, footer
├── js/
│   └── main.js             # Navbar scroll, FAQ, reveal, metric bars
└── design-system/
    ├── README.md            # Este arquivo
    └── tokens.json          # Tokens em formato JSON (referência)
```

---

## Como usar

### 1. Carregar a fonte

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800&display=swap" rel="stylesheet">
```

### 2. Importar os CSS na ordem correta

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/layout.css">
```

### 3. Importar o JS antes do `</body>`

```html
<script src="js/main.js" defer></script>
```

---

## Paleta de cores

| Token CSS              | Hex       | Uso                            |
|------------------------|-----------|--------------------------------|
| `--bg-primary`         | `#151821` | Background principal           |
| `--bg-secondary`       | `#1D212B` | Cards, navbar, superfícies     |
| `--color-primary`      | `#EA580C` | Botões, CTAs, destaques        |
| `--color-primary-hover`| `#F97316` | Hover de elementos interativos |
| `--color-accent-soft`  | `#FDBA74` | Badges, glows, detalhes        |
| `--text-primary`       | `#F5F7FB` | Títulos, texto principal       |
| `--text-secondary`     | `#A7AEC1` | Descrições, subtítulos         |
| `--text-muted`         | `#7D8597` | Labels, placeholders           |
| `--border-color`       | `#2A2F3A` | Bordas, divisores              |

### Regra 80/20
A interface deve ser **80% neutra** (fundos escuros) e **20% destaque** (laranja terracota).

---

## Tipografia

Fonte: **Satoshi** — premium, moderna, limpa.

| Classe CSS      | Tamanho | Peso | Uso principal              |
|-----------------|---------|------|----------------------------|
| `.display-xl`   | 72px    | 700  | Título do Hero             |
| `.display-l`    | 60px    | 700  | Hero menor / seções grandes|
| `.heading-1`    | 52px    | 700  | Statements fora do hero    |
| `.heading-2`    | 40px    | 700  | Títulos de seção           |
| `.heading-3`    | 28px    | 600  | Títulos de card            |
| `.heading-4`    | 22px    | 600  | FAQ, labels fortes         |
| `.body-xl`      | 20px    | 400  | Descrição do Hero          |
| `.body-l`       | 18px    | 400  | Descrições de seção        |
| `.body-m`       | 16px    | 400  | Texto padrão (mais usado)  |
| `.body-s`       | 14px    | 400  | Texto de apoio             |

---

## Border radius

| Token CSS            | Valor | Uso                       |
|----------------------|-------|---------------------------|
| `--radius-button`    | 14px  | Botões                    |
| `--radius-input`     | 16px  | Inputs, FAQ               |
| `--radius-card`      | 20px  | Cards                     |
| `--radius-container` | 24px  | Containers maiores        |
| `--radius-feature`   | 28px  | Blocos de feature         |
| `--radius-hero`      | 32px  | CTA block, hero glass     |

---

## Componentes disponíveis

### Botões
```html
<!-- Primário -->
<a href="#" class="btn btn-primary">
  Agendar diagnóstico
  <svg class="btn-arrow" ...>...</svg>
</a>

<!-- Secundário -->
<a href="#" class="btn btn-secondary">Ver serviços</a>

<!-- Pequeno -->
<a href="#" class="btn btn-primary btn-sm">Saiba mais</a>
```

### Badge
```html
<span class="badge">
  <span class="badge-dot"></span>
  Automação com IA
</span>
```

### Eyebrow
```html
<span class="eyebrow">Nossos serviços</span>
```

### Card
```html
<div class="card">
  <div class="card-icon"><!-- SVG --></div>
  <p class="card-number">01</p>
  <h3 class="card-title">Título do card</h3>
  <p class="card-desc">Descrição do serviço ou feature.</p>
</div>
```

### Section header
```html
<div class="section-header">
  <span class="eyebrow">Label da seção</span>
  <h2 class="section-title heading-2">Título da seção</h2>
  <p class="section-desc body-l">Descrição opcional.</p>
</div>

<!-- Centralizado -->
<div class="section-header centered">...</div>
```

### FAQ
```html
<div class="faq-list">
  <div class="faq-item">
    <button class="faq-trigger" aria-expanded="false">
      Pergunta aqui
      <span class="faq-icon"><!-- + icon --></span>
    </button>
    <div class="faq-content">
      <div class="faq-body">Resposta aqui.</div>
    </div>
  </div>
</div>
```

### Input
```html
<div class="input-group">
  <label class="input-label" for="email">Email</label>
  <input class="input" type="email" id="email" placeholder="seu@email.com">
</div>
```

### Reveal animation
```html
<div class="reveal">Aparece ao fazer scroll</div>
<div class="reveal reveal-delay-2">Com delay de 0.16s</div>
```

### Layout container
```html
<section class="section">
  <div class="container">
    <!-- conteúdo -->
  </div>
</section>

<!-- Seção com background alternativo -->
<section class="section section-alt">
  <div class="container">...</div>
</section>
```

---

## Diretrizes de uso

### ✅ Fazer
- Usar laranja apenas para ações importantes e pontos de foco
- Manter hierarquia tipográfica clara entre eyebrow → título → descrição → CTA
- Dar bastante respiro entre as seções
- Usar bordas suaves, não eliminar completamente
- Hover states em todos os elementos interativos

### ❌ Evitar
- Usar laranja em excesso ou em blocos inteiros
- Misturar muitos pesos tipográficos numa mesma seção
- Layout apertado sem respiro
- Sombras pesadas ou escuras demais
- Animações exageradas ou agressivas
