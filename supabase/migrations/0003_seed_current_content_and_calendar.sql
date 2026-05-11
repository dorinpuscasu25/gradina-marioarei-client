create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_type text not null default 'manual' check (event_type in ('manual', 'booking', 'blocked')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  notes text not null default '',
  color text not null default '#173f35',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

drop trigger if exists calendar_events_touch_updated_at on public.calendar_events;
create trigger calendar_events_touch_updated_at
before update on public.calendar_events
for each row execute function public.touch_updated_at();

alter table public.calendar_events enable row level security;

drop policy if exists "Admins manage calendar events" on public.calendar_events;
create policy "Admins manage calendar events"
on public.calendar_events for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.experiences (slug, title, description, highlights, images, currency, status, sort_order)
values
  ('plimbari-in-natura','{"ro":"Plimbări în natură","en":"Nature walks","ru":"Прогулки на природе"}','{"ro":"Explorează dealurile și pădurile din jur.","en":"Explore the surrounding hills and forests.","ru":"Исследуйте окрестные холмы и леса."}','{"ro":[],"en":[],"ru":[]}',array['/zona_pentru_rug.jpg'],'lei','published',10),
  ('seri-la-gratar','{"ro":"Seri la grătar","en":"BBQ evenings","ru":"Вечера барбекю"}','{"ro":"Bucură-te de mese în aer liber cu cei dragi.","en":"Enjoy outdoor meals with your loved ones.","ru":"Наслаждайтесь ужинами на свежем воздухе с близкими."}','{"ro":[],"en":[],"ru":[]}',array['/zona_pentru_rug.jpg','/colage2.jpg'],'lei','published',20),
  ('relaxare','{"ro":"Relaxare","en":"Relaxation","ru":"Отдых"}','{"ro":"Liniște deplină departe de agitația orașului.","en":"Complete peace away from the noise of the city.","ru":"Полное спокойствие вдали от городской суеты."}','{"ro":[],"en":[],"ru":[]}',array['/ciubar.jpg'],'lei','published',30),
  ('timp-cu-familia','{"ro":"Timp cu familia","en":"Family time","ru":"Время с семьей"}','{"ro":"Spațiu perfect pentru jocuri și activități comune.","en":"A perfect place for games and shared activities.","ru":"Идеальное место для игр и совместных занятий."}','{"ro":[],"en":[],"ru":[]}',array['/casamare.jpg'],'lei','published',40),
  ('gastronomie-locala','{"ro":"Gastronomie locală","en":"Local gastronomy","ru":"Местная гастрономия"}','{"ro":"Gustul autentic al produselor locale.","en":"The authentic taste of local products.","ru":"Настоящий вкус местных продуктов."}','{"ro":[],"en":[],"ru":[]}',array['/colage1.jpg'],'lei','published',50),
  ('privitul-stelelor','{"ro":"Privitul stelelor","en":"Stargazing","ru":"Наблюдение за звездами"}','{"ro":"Cer senin și nopți magice la foc de tabără.","en":"Clear skies and magical nights by the fire.","ru":"Ясное небо и волшебные вечера у костра."}','{"ro":[],"en":[],"ru":[]}',array['/colage4.jpg'],'lei','published',60)
on conflict (slug) do nothing;

insert into public.app_settings (key, value)
values
  ('home', '{
    "hero": {
      "badge": {"ro":"Vălcineț, Moldova","en":"Valcinet, Moldova","ru":"Валчинец, Молдова"},
      "title": {"ro":"Bine ați venit la Pensiunea Grădina Mărioarei","en":"Welcome to Pensiunea Grădina Mărioarei","ru":"Добро пожаловать в Pensiunea Grădina Mărioarei"},
      "subtitle": {"ro":"Rezervă un sejur în inima naturii și bucură-te de o experiență de neuitat.","en":"Book a stay in the heart of nature and enjoy an unforgettable experience.","ru":"Забронируйте отдых среди природы и насладитесь незабываемым опытом."},
      "primaryLabel": {"ro":"Rezervă acum","en":"Book now","ru":"Забронировать"},
      "secondaryLabel": {"ro":"Sună acum","en":"Call now","ru":"Позвонить"},
      "secondaryPhone": "060588845",
      "images": ["/colage1.jpg","/colage2.jpg","/colage4.jpg"]
    },
    "gallery": ["/ciubar.jpg","/ciubar2.jpg","/zona_pentru_rug.jpg","/casamare.jpg","/casa_mare_interior.jpg","/Screenshot_2026-02-11_at_22.28.27.png","/Screenshot_2026-02-11_at_22.28.32.png","/Screenshot_2026-02-11_at_22.28.43.png"]
  }'::jsonb),
  ('discover', '{
    "title": {"ro":"Descoperă Zona","en":"Discover Area","ru":"Исследуйте окрестности"},
    "subtitle": {"ro":"Vălcineț și împrejurimile","en":"Valcinet and surroundings","ru":"Валчинец и окрестности"},
    "items": [
      {"title":{"ro":"Codrii Călărașilor","en":"Codrii Călărașilor","ru":"Леса Кэлэраш"},"description":{"ro":"Păduri seculare pline de mister și frumusețe.","en":"Ancient forests full of mystery and beauty.","ru":"Вековые леса, полные тайны и красоты."},"images":[]},
      {"title":{"ro":"Tradiții Locale","en":"Local traditions","ru":"Местные традиции"},"description":{"ro":"Meșteșuguri și obiceiuri păstrate cu sfințenie.","en":"Crafts and customs preserved with care.","ru":"Ремесла и обычаи, бережно сохраненные."},"images":[]},
      {"title":{"ro":"Peisaje de Poveste","en":"Fairytale landscapes","ru":"Сказочные пейзажи"},"description":{"ro":"Dealuri domoale și priveliști panoramice.","en":"Gentle hills and panoramic views.","ru":"Мягкие холмы и панорамные виды."},"images":[]}
    ],
    "images": ["/Screenshot_2026-02-11_at_22.28.43.png","/casusta_veci1.jpg","/casa_mare_interior.jpg","/_MG_0206_copy.jpg"],
    "legendTitle": {"ro":"Legende și Povești","en":"Legends and stories","ru":"Легенды и истории"},
    "legendText": {"ro":"Se spune că dealurile Vălcineților ascund secrete din timpuri străvechi, unde pădurea șoptește povești celor care ascultă cu atenție...","en":"They say the hills of Valcinet keep ancient secrets, where the forest whispers stories to those who listen carefully...","ru":"Говорят, холмы Валчинца хранят древние тайны, а лес шепчет истории тем, кто умеет слушать..."},
    "legendLabel": {"ro":"Folclor și Povești","en":"Folklore and stories","ru":"Фольклор и истории"}
  }'::jsonb),
  ('contact', '{
    "phones": ["060588845"],
    "emails": ["gradinamarioarei@gmail.com"],
    "address": {"ro":"str. Ștefan cel Mare nr. 123, Vălcineț, raionul Călărași","en":"123 Stefan cel Mare street, Valcinet, Calarasi district","ru":"ул. Штефан чел Маре 123, Валчинец, район Калараш"},
    "map_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1939.7998114901357!2d28.127696051050208!3d47.26903757367802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbaf0575e7cb31%3A0x79b8f18904674bdc!2sPensiunea%20Agroturistica%20Gradina%20Marioarei!5e1!3m2!1sen!2s!4v1772389410056!5m2!1sen!2s",
    "social_links": []
  }'::jsonb),
  ('about', '{
    "headline": {"ro":"Despre Pensiune","en":"About the guesthouse","ru":"О гостевом доме"},
    "story": {"ro":"Pensiunea Agroturistica Grădina Marioarei, a început din dorința de a valorifica locul în care au prins viață primele amintiri. În acest spațiu plin de frumos, cu o priveliște de poveste, s-a născut ideea de a crea un loc unde oaspeții nu vin doar în vacanță, ci acasă, ca în vizită la bunei.","en":"Pensiunea Agroturistica Grădina Marioarei began from the desire to cherish the place where the first memories came to life. In this beautiful space, with a fairytale view, the idea was born to create a place where guests do not just come on vacation, but feel at home.","ru":"Pensiunea Agroturistica Grădina Marioarei появилась из желания сохранить место, где ожили первые воспоминания. В этом красивом пространстве, с волшебным видом, родилась идея создать место, куда гости приезжают не просто на отдых, а как домой."},
    "mission": {"ro":"Misiunea noastră este să oferim o oază de liniște și autenticitate.","en":"Our mission is to offer an oasis of peace and authenticity.","ru":"Наша миссия — предложить оазис спокойствия и подлинности."},
    "image": "/casa_mare_interior.jpg"
  }'::jsonb)
on conflict (key) do update
set value = excluded.value;
