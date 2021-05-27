## Passo a Passo

Primeiro , cria o projeto:

```bash
npx create next-app nomeDoProjeto
# or
yarn create next-app nomeDoProjeto
```

Depois entra na pasta do projeto:
```bash
cd nomeDoProjeto
```
Abre no VS code:
```bash
code .
```
roda o projeto
```bash
npm run dev
# or
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.


##  Configurando TypeScript

adciona as dependencias necesarias
```bash
yarn add --dev typescript @types/react @types/node
```
cria arquivo tsconfig.json
```bash
touch tsconfig.json
```
roda o comando
```bash
npm run dev
# or
yarn dev
```

mude o strict do tsconfig para true

cria pasta src na raiz do projeto e mova a pasta pages para dentro dela e renomeia o index.js pra index.tsx

##  Configurando o EditorConfig

cria na raiz do projeto o arquivo .editorconfig e dentro dele adicione os seguintes codigos:

root = true

```bash
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

##  Configurando o Eslint

No terminal intale o Eslint:

```bash
npx eslint --init
```

instale os plugins necessarios com:

```bash
yarn add eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
```

instale os plugin do react hooks:

```bash
yarn add eslint-plugin-react-hooks --dev
```
em "plugins" dentro do .eslintrc.json adicione:
```bash
  "react-hooks"
  ```

Abaixo de "env" crie:
```bash
 "settings":{
   "react":{
     "version": "detect"
   }
 },
 ```


Adicione algumas regras em "rules":
```bash
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn"
  ```
ainda em "rules" desative a regra do propTypes:
```bash
  "react/props-types": "off"
  ```
e tambem desabilite o react-in-jsx-scope:
```bash
  "react/react-in-jsx-scope": "off"
  ```
desative a boundary-types:
```bash
  "@typescript-eslint/explicit-module-boundary-types": "off"
  ```
  ficara assim:
  ```bash
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/props-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  ```

##  Configurando o Prettier com o Eslint

instale o prettier:

```bash
  yarn add --dev --exact prettier
```
crie na raiz do projeto o arquivo .prettierrc e adicione o seguinte codigo:
```bash
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true
}
```

Para configurar Prettier com o Eslint intale os plugins:

```bash
  yarn add --dev eslint-plugin-prettier
  yarn add --dev eslint-config-prettier
```

Adicione no eslintrc.json:
```bash
{
  "extends": ["plugin:prettier/recomended"]
}
```

##  Configurando Git Hooks com Husky

Primeiro instale o Husky:
```bash
yarn add husky --dev
```
em seguida rode o comando :
```bash
yarn husky install
```
Instala o lint-staged:

```bash
yarn add lint-staged --dev
```
Adicione as regras no package.json logo abaixo dos scripts:
```bash
"lint-staged": {
  "src/**/*": [
    "yarn lint --fix"
  ]
},
```

##  Instalando e Configurando Jest com Typescript

instalar dependencias necessarias:

```bash
yarn add --dev jest @babel/preset-typescript @types/jest
```

No eslintrc faça:
```bash
"env":{
  "jest": true,
  "node": true
}
```

Crie o arquivo jest.config.js na raiz do projeto e escreva os comandos:
```bash
module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_mudules', '/.next'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts']
}
```

Crie o arquivo .babelrc na raiz do projeto e escreva os comandos:
```bash
{
  "presets": ["next/babel", "@babel/preset-typescript"]
}
```

Crie uma pasta na raiz do projeto chamada .jest e crie um arquivo setup.ts

Va no package.json e defina o comando de teste no scripts:

```bash
{
  "test": "jest"
}
```

##  Instalando e Configurando React Testing Library

instale as dependencias:

```bash
yarn add --dev @testing-library/react @testing-library/jest-dom
```
import no setup.ts:
```bash
import '@testing-library/jest-dom'
```


##  Instalando e Configurando Styled-Components

instale as dependencias:

```bash
yarn add styled-components
yarn add --dev @types/styled-components babel-plugin-styled-components
```
Dentro do .babelrc adicione acima de presets:
```bash
  "plugins":[
    [
      "babel-plugin-styled-components",
      {
        "ssr": false
      }
    ]
  ],
```
Configuracao do styled component :: dentro de pages crie um novo arquivo _document.tsx e cole o codigo:
```bash
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```







<!--   "husky": {
    "hook": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*": [
      "yarn lint --fix",
      "yarn test --findRelatedTests --bail"
    ]
  }, -->


##  Configurando o PWA

instale o next-pwa:

```bash
  yarn add next-pwa
```
Instale o webpack4 para nao da erro:
```bash
  yarn add webpack@4
```

Crie na raiz do projeto o arquivo next.config.js e adicione o codigo:
```bash
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd
  }
})

```
crie dentro de public o arquivo manifest.json e adicione o codigo:

``` bash
{
  "name": "Diego Sousa Boilerplate",
  "short_name": "Boilerplate",
  "icons": [
    {
      "src": "/img/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/img/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#06092b",
  "background_color": "#06092b",
  "start_url": "/",
  "display": "fullscreen",
  "orientation": "portrait",
  "description": "Boilerplate utilizando Typescript, React, NextJS e Styled Components!"
}
```

Em pages dentro de _app.tsx na Head adicione:

```bash
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#06092B" />
```

Apos isso rode o comando yarn build no terminal para ser gerado o build e entender que esta em producao e rode yarn start para levantar os arquivos de producao.
