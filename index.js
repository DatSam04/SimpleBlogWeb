import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const PORT = 3000;
//blog data
const blogs = [
  {
    id: 1,
    title: "How “StarShield” Became the Go-To Marvel Rivals Streamer",
    date: "September 8, 2025",
    author: "Alex Carter",
    content: [
      "Few streamers have captured the attention of the Marvel Rivals community quite like StarShield. Known for his high-energy commentary and sharp reflexes, StarShield has turned late-night matches into must-watch entertainment on Twitch. His rise began with casual streams, but his consistent interaction with fans quickly set him apart.",
      "What makes StarShield unique isn’t just his gameplay skills — it’s his ability to break down team compositions, explain mechanics, and make even new players feel welcome. Many viewers credit his guides and Q&A sessions as the reason they started playing Marvel Rivals seriously.",
      "With thousands tuning in nightly, StarShield has become more than just a gamer — he’s a community builder. Whether he’s testing new updates or mentoring rising players, StarShield has cemented himself as one of the most influential voices in the Marvel Rivals scene."
    ]
  },
  {
    id: 2,
    title: "The Rise of NovaBlade: Marvel Rivals’ First Tournament Champion",
    date: "August 29, 2025",
    author: "Jenna Lee",
    content: [
      "In the competitive arena of Marvel Rivals, one name that keeps coming up is NovaBlade. This pro player stunned audiences during the first official tournament by pulling off a near-perfect run, showcasing impeccable coordination and an unshakable mindset under pressure.",
      "NovaBlade’s strategy revolves around adaptability. Instead of sticking to one character, he rotates between several heroes depending on the enemy lineup. Analysts point out that this flexibility is what gave him the edge over more predictable opponents.",
      "Fans now see NovaBlade as a role model, and his tournament win has sparked fresh interest in Marvel Rivals esports. With more tournaments on the horizon, all eyes are on NovaBlade to see if he can maintain his dominance."
    ]
  },
  {
    id: 3,
    title: "Doctor Strange’s Surprising Power Shift in the New Update",
    date: "September 5, 2025",
    author: "Marcus Grant",
    content: [
      "The latest Marvel Rivals patch brought significant balance changes, and none have sparked more discussion than the update to Doctor Strange. Once seen as a niche support pick, Strange now finds himself in the spotlight thanks to reworked cooldowns and enhanced damage scaling.",
      "The community reaction has been mixed. Casual players love Strange’s newfound offensive potential, while pro players debate whether the buff makes him too oppressive in competitive play. His ability to control space with dimensional barriers now forces entire teams to rethink their approach.",
      "Regardless of the debate, one thing is clear: Doctor Strange has gone from an overlooked choice to a powerhouse. As the meta shifts, many expect him to become a staple in high-level play — and possibly the focus of the next balance patch."
    ]
  },
  {
    id: 4,
    title: "Scarlet Witch Dominates the Mid-Season Update",
    date: "September 10, 2025",
    author: "Lena Torres",
    content: [
        "The mid-season update brought several buffs, but none more impactful than Scarlet Witch’s improved energy scaling. Her hex abilities now pack a serious punch, turning her into a must-pick hero in competitive matches.",
        "Players are reporting that Scarlet Witch is not only stronger in 1v1 duels but also in team fights, where her zone control makes her invaluable. Her presence has shifted the meta significantly.",
        "Developers are keeping an eye on her performance, and while fans enjoy her newfound power, some are already predicting a nerf in the next patch."
    ]
  }
];
//Include static folder public
app.use(express.static("public"));

//Use bodyParser to read the body from form submission
app.use(bodyParser.urlencoded({extended: true}));

//Get API to redirect to different pages
app.get("/", (req, res) => {
    res.render("home.ejs", { blogs });
});
app.get("/create", (req, res) => {
    res.render("create.ejs");
});
app.get("/update/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }
    res.render("update.ejs", { blog });
});

//Post APi for create and update blogs in DOM memory
app.post("/create", (req, res) => {
  const { title, author, content } = req.body;

  const newId = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;

  blogs.push({
    id: newId,
    title,
    author,
    date: new Date().toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"}),
    content: content.split("\n\n")
  });

  res.redirect("/");
});

app.post("/update/:id", (req, res) => {
  const blogID = parseInt(req.params.id);
  const blog = blogs.find(b => b.id === blogID);

  if(!blog){
    return res.status(404).send("Blog not found");
  }

  //Update information in the DOM memory
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.content = req.body.content.split("\n\n");

  res.redirect("/");
})

//Delete API to remove a specific blog in the DOM memory
app.delete("/delete/:id", (req, res) => {
  const blogID = parseInt(req.params.id, 10);
  const index = blogs.findIndex(blog => blog.id === blogID);

  if(index !== -1){
    console.log("Remove blog: " + blogs[index].title);
    blogs.splice(index, 1);
    res.json({success: true});
  }else{
    res.status(404).json({success: false, message: "Blog not found"});
  }
});

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
});