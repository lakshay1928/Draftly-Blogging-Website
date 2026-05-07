const blogs = [
  {
    _id: "b1",
    title: "Top 5 JavaScript Frameworks in 2025",
    content: `
      <p>JavaScript is evolving faster than ever, and 2025 has introduced some game-changing frameworks that every developer should keep an eye on.</p>
      <ol>
        <li><strong>React 19</strong> – Now with built-in server components and faster rendering pipelines. React continues to dominate with its active community and massive ecosystem.</li>
        <li><strong>Vue 4</strong> – Offers reactivity that feels magical. Vue’s learning curve is gentle, making it great for beginners and pros alike.</li>
        <li><strong>SvelteKit</strong> – No virtual DOM, lightning-fast, and a joy to write. SvelteKit is gaining traction for building reactive apps effortlessly.</li>
        <li><strong>Qwik</strong> – Built for instant loading, Qwik introduces a new paradigm with resumability instead of hydration.</li>
        <li><strong>SolidJS</strong> – Uses fine-grained reactivity like Svelte but with JSX syntax. Extremely performant and very close to native JS speed.</li>
      </ol>
      <blockquote>
        As a developer in 2025, choosing the right framework depends on your project size, team skills, and future scalability needs.
      </blockquote>
      <p>Stay ahead by experimenting with these frameworks and contribute to their open-source communities!</p>
    `,
    excerpt:
      "JavaScript is evolving rapidly in 2025. From React 19 to Qwik, here are the top frameworks that are reshaping the future of frontend development.",

    author: "Rahul Sharma",
    profilePicture:
      "https://ui-avatars.com/api/?name=Rahul+Sharma&background=2b7fff&color=fff&format=svg",

    featuredImage: "https://source.unsplash.com/800x400/?javascript,code",
    tags: ["javascript", "frameworks", "webdev"],
    category: "Technology",
    likes: ["u2"],
    likesCount: 1,
    savedBy: ["u2"],
    isPublished: true,
    readTime: 4,
  },
  {
    _id: "b2",
    title: "Exploring the Streets of Kyoto",
    content: `
      <p>Kyoto, Japan’s cultural capital, offers a beautiful blend of history, tradition, and modernity. Walking through its narrow streets feels like stepping into another era.</p>
      <h3>Morning in Gion</h3>
      <p>Start your day in Gion, Kyoto's famous geisha district. Cobblestone paths, wooden houses, and the occasional glimpse of a kimono-clad geisha make it magical.</p>
      <h3>Temples & Shrines</h3>
      <p>Don't miss <strong>Kinkaku-ji (The Golden Pavilion)</strong> and <strong>Fushimi Inari-taisha</strong> with its thousands of iconic red torii gates. They're not just beautiful, they’re spiritual experiences.</p>
      <h3>Food Adventures</h3>
      <p>Try matcha ice cream, Kyoto-style ramen, and traditional kaiseki meals. <em>Nishiki Market</em> is a paradise for food lovers.</p>
      <blockquote>Kyoto isn't just a city, it’s a journey through Japan’s soul.</blockquote>
      <p>Whether you're a solo traveler or exploring with friends, Kyoto will leave you spellbound.</p>
    `,
    excerpt:
      "Kyoto is more than a destination—it's an experience. From ancient temples and traditional tea houses to vibrant markets and serene gardens, it’s a must-visit in Japan.",
    author: "Nitin Mehra",
    profilePicture:
      "https://ui-avatars.com/api/?name=Nitin+Mehra&background=2b7fff&color=fff&format=svg",
    featuredImage: "https://source.unsplash.com/800x400/?kyoto,japan",
    tags: ["travel", "japan", "culture"],
    category: "Travel",
    likes: ["u1"],
    likesCount: 1,
    savedBy: ["u1"],
    isPublished: true,
    readTime: 5,
  },
  {
    _id: "b3",
    title: "Healthy Breakfast Ideas",
    content: `
      <p>Breakfast is the most important meal of the day, and making it nutritious doesn’t have to be boring. Here are 5 easy and tasty ideas to kickstart your mornings:</p>
      <ul>
        <li><strong>Overnight Oats:</strong> Mix oats, milk (or almond milk), chia seeds, and honey. Add fruits like bananas or berries and let it chill overnight.</li>
        <li><strong>Avocado Toast:</strong> Whole grain bread + smashed avocado + boiled egg + a pinch of chili flakes = perfection.</li>
        <li><strong>Smoothie Bowl:</strong> Blend bananas, spinach, yogurt, and peanut butter. Top it with granola, coconut flakes, and sliced fruit.</li>
        <li><strong>Veggie Omelette:</strong> Eggs, bell peppers, onions, spinach — all sautéed to a colorful and protein-rich start.</li>
        <li><strong>Greek Yogurt Parfait:</strong> Layer yogurt with honey, nuts, and seasonal fruits in a glass.</li>
      </ul>
      <blockquote>A healthy breakfast fuels your brain and keeps you energized throughout the day.</blockquote>
      <p>Try switching things up each week to keep your mornings exciting and nutritious!</p>
    `,
    excerpt:
      "Tired of boring breakfasts? These 5 healthy and easy-to-make ideas will keep your mornings fresh, tasty, and full of energy.",
    author: "Rahul Sharma",
    profilePicture:
      "https://ui-avatars.com/api/?name=Rahul+Sharma&background=2b7fff&color=fff&format=svg",
    featuredImage: "https://source.unsplash.com/800x400/?healthy,breakfast",
    tags: ["health", "food", "lifestyle"],
    category: "Health",
    likes: ["u1"],
    likesCount: 1,
    savedBy: [],
    isPublished: true,
    readTime: 3,
  },
];

export default blogs;
