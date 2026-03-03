import puppeteer from 'puppeteer-core';

export async function generateCV(data: any, locale: string) {
  // Check for local chrome/chromium if possible
  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    '/usr/bin/google-chrome' ||
    '/usr/bin/chromium-browser' ||
    '/usr/bin/chromium';

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    const html = `
      <!DOCTYPE html>
      <html lang="${locale}">
      <head>
        <meta charset="UTF-8">
        <style>
          :root {
            --primary: #1e3a8a;
            --secondary: #64748b;
            --text-main: #1e293b;
            --text-light: #475569;
            --border: #e2e8f0;
            --bg-light: #f8fafc;
          }
          
          @page {
            size: A4;
            margin: 0;
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--text-main);
            line-height: 1.5;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
          }

          .brand-strip {
             height: 8px;
             background: var(--primary);
             width: 100%;
          }

          .container {
            padding: 40px 50px;
          }

          .header {
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 1.5px solid var(--border);
            padding-bottom: 20px;
          }

          .header-info h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.025em;
            color: var(--primary);
            text-transform: uppercase;
          }

          .header-info .role {
            font-size: 16px;
            color: var(--secondary);
            font-weight: 500;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .section {
            margin-bottom: 28px;
          }

          .section-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }

          .section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: var(--border);
            margin-left: 15px;
          }

          .intro {
            font-size: 13px;
            color: var(--text-light);
            text-align: justify;
            background: var(--bg-light);
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid var(--primary);
          }

          .experience-item {
            margin-bottom: 20px;
            position: relative;
          }

          .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4px;
          }

          .company {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-main);
          }

          .period {
            font-size: 12px;
            color: var(--secondary);
            font-weight: 500;
          }

          .role-title {
            font-size: 13px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 8px;
          }

          .achievements {
            margin: 0;
            padding-left: 18px;
            list-style-type: none;
          }

          .achievements li {
            font-size: 12.5px;
            color: var(--text-light);
            margin-bottom: 4px;
            position: relative;
          }

          .achievements li::before {
            content: "•";
            color: var(--primary);
            font-weight: bold;
            display: inline-block; 
            width: 1em;
            margin-left: -1em;
          }

          .tech-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .tech-category {
            background: var(--bg-light);
            padding: 12px;
            border-radius: 8px;
            border: 1px solid var(--border);
          }

          .tech-category-title {
            font-size: 11px;
            font-weight: 700;
            color: var(--secondary);
            text-transform: uppercase;
            margin-bottom: 8px;
            display: block;
          }

          .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .tech-tag {
            background: white;
            border: 1px solid var(--border);
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            color: var(--text-main);
            font-weight: 500;
          }

          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 10px;
            color: var(--secondary);
            border-top: 1px solid var(--border);
            padding-top: 15px;
          }

          @media print {
            .container { padding: 40px 50px; }
          }
        </style>
      </head>
      <body>
        <div class="brand-strip"></div>
        <div class="container">
          <div class="header">
            <div class="header-info">
              <h1>${data.name}</h1>
              <div class="role">${data.role}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">About</div>
            <div class="intro">${data.intro}</div>
          </div>

          <div class="section">
            <div class="section-title">${data.labels.experience}</div>
            ${data.experience.map((exp: any) => `
              <div class="experience-item">
                <div class="experience-header">
                  <div class="company">${exp.company}</div>
                  <div class="period">${exp.period}</div>
                </div>
                <div class="role-title">${exp.role}</div>
                <ul class="achievements">
                  ${exp.achievements.map((ach: string) => `<li>${ach}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">${data.labels.techStack}</div>
            <div class="tech-grid">
              ${data.techStack.map((tech: any) => `
                <div class="tech-category">
                  <span class="tech-category-title">${tech.category}</span>
                  <div class="tech-tags">
                    ${tech.items.split(',').map((item: string) => `<span class="tech-tag">${item.trim()}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="footer">
            ${locale === 'es' ? 'Generado dinámicamente' : 'Generated dynamically'} - ${data.name} - ${new Date().getFullYear()}
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '0.75in', right: '0.75in', bottom: '0.75in', left: '0.75in' },
      printBackground: true,
    });

    await browser.close();
    return pdf;
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}
