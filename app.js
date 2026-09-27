const apis = [
  {
    name: 'Cloudflare API',
    category: 'cdn',
    score: 9.6,
    description:
      'سرویس‌های CDN و edge routing مناسب برای کاهش latency و بهبود تجربه کاربران ایرانی با کش‌کردن محتوای ثابت و پاسخ‌های سبک.',
    latency: '80-140ms',
    bandwidth: 'کم',
    stability: 'خیلی بالا',
    tags: ['CDN', 'کش', 'فقط-API', 'سریع'],
  },
  {
    name: 'Vercel Edge',
    category: 'low-bandwidth',
    score: 9.2,
    description:
      'برای APIهای ریسپانسیو و استاتیک بسیار خوب است؛ زمان پاسخ کوتاه و ساختار مناسب برای پروژه‌های جدید.',
    latency: '90-150ms',
    bandwidth: 'کم',
    stability: 'بالا',
    tags: ['Edge', 'SSR', 'Serverless', 'Fast'],
  },
  {
    name: 'Supabase',
    category: 'auth',
    score: 8.8,
    description:
      'پلتفرم مناسب برای auth، database و realtime با قراردادهای ساده و وابستگی کمتر به دیتاسنترهای دور.',
    latency: '120-180ms',
    bandwidth: 'متوسط',
    stability: 'بالا',
    tags: ['Auth', 'DB', 'Realtime', 'JSON'],
  },
  {
    name: 'Neshan API',
    category: 'maps',
    score: 8.9,
    description:
      'برای نقشه، مسیریابی و خدمات محلی، انتخابی طبیعی برای پروژه‌های ایرانی با نیاز به داده‌های بومی.',
    latency: '100-180ms',
    bandwidth: 'کم',
    stability: 'بالا',
    tags: ['نقشه', 'محلی', 'مسیر', 'ایران'],
  },
  {
    name: 'ZarinPal',
    category: 'payments',
    score: 8.5,
    description:
      'برای پرداخت‌های آنلاین و سرویس‌های مالی، گزینه‌ای شناخته‌شده با API ساده و اجرای نسبتاً قابل‌پیش‌بینی.',
    latency: '110-220ms',
    bandwidth: 'کم',
    stability: 'بالا',
    tags: ['پرداخت', 'درگاه', 'بانکی', 'ایرانی'],
  },
  {
    name: 'GitHub REST API',
    category: 'low-bandwidth',
    score: 8.7,
    description:
      'مناسب برای دریافت داده‌های عمومی، اسناد، و ابزار‌های CI، با پاسخ‌های ساخت‌یافته و بهینه‌سازی مناسب برای توسعه.',
    latency: '80-170ms',
    bandwidth: 'کم',
    stability: 'خیلی بالا',
    tags: ['GitHub', 'REST', 'Public', 'DevOps'],
  },
  {
    name: 'Appwrite',
    category: 'auth',
    score: 8.6,
    description:
      'ابزار مناسب برای auth، storage و database با نسخه‌های سبک و معماری قابل‌کاستن برای اپ‌های موبایل و وب.',
    latency: '130-200ms',
    bandwidth: 'متوسط',
    stability: 'بالا',
    tags: ['Auth', 'DB', 'Storage', 'Self-host'],
  },
  {
    name: 'Bunny CDN',
    category: 'cdn',
    score: 8.9,
    description:
      'برای فایل‌های ثابت، تصاویر و ویدیوها، انتخابی مناسب برای کاهش مصرف پهنای باند و پخش بهتر محتوا.',
    latency: '90-160ms',
    bandwidth: 'کم',
    stability: 'بالا',
    tags: ['فایل', 'image', 'video', 'CDN'],
  },
  {
    name: 'OpenWeather',
    category: 'low-bandwidth',
    score: 8.3,
    description:
      'برای سرویس‌های آب‌وهوا و داده‌های عمومی، پاسخ‌های سبک و قابل‌فهم با اثرگذاری کم روی مصرف اینترنت.',
    latency: '120-250ms',
    bandwidth: 'کم',
    stability: 'بالا',
    tags: ['weather', 'public', 'light'],
  },
  {
    name: 'Firebase',
    category: 'auth',
    score: 8.1,
    description:
      'در صورت دسترسی مناسب، برای auth و داده‌های realtime از گزینه‌های خوب است اما باید latency و شبکهٔ کاربر را بررسی کنید.',
    latency: '150-260ms',
    bandwidth: 'متوسط',
    stability: 'بالا',
    tags: ['Realtime', 'Auth', 'Mobile'],
  },
];

const apiGrid = document.getElementById('apiGrid');
const searchInput = document.getElementById('searchInput');
const apiCount = document.getElementById('apiCount');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = apis.filter((api) => {
    const matchesFilter =
      currentFilter === 'all' || api.category === currentFilter;

    const haystack = [
      api.name,
      api.description,
      api.tags.join(' '),
      api.category,
      api.bandwidth,
      api.stability,
    ]
      .join(' ')
      .toLowerCase();

    const matchesQuery = haystack.includes(query);
    return matchesFilter && matchesQuery;
  });

  apiCount.textContent = String(filtered.length);

  if (!filtered.length) {
    apiGrid.innerHTML = `
      <div class="empty-state">
        هیچ API‌ای با این فیلتر و جست‌وجو پیدا نشد. سعی کنید عبارت دیگری وارد کنید.
      </div>
    `;
    return;
  }

  apiGrid.innerHTML = filtered
    .map(
      (api) => `
        <article class="api-card">
          <div class="api-card-header">
            <div class="api-title">
              <h3 class="api-name">${escapeHTML(api.name)}</h3>
              <span class="api-category">${escapeHTML(api.category)}</span>
            </div>
            <div class="score-pill">${api.score.toFixed(1)}</div>
          </div>

          <p>${escapeHTML(api.description)}</p>

          <div class="meta-grid">
            <div class="meta-item">
              <span>Latency</span>
              <strong>${escapeHTML(api.latency)}</strong>
            </div>
            <div class="meta-item">
              <span>پهنای باند</span>
              <strong>${escapeHTML(api.bandwidth)}</strong>
            </div>
            <div class="meta-item">
              <span>پایداری</span>
              <strong>${escapeHTML(api.stability)}</strong>
            </div>
            <div class="meta-item">
              <span>نوع</span>
              <strong>${escapeHTML(api.category)}</strong>
            </div>
          </div>

          <div class="tag-list">
            ${api.tags
              .map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`)
              .join('')}
          </div>
        </article>
      `
    )
    .join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderCards();
  });
});

searchInput.addEventListener('input', renderCards);
renderCards();
