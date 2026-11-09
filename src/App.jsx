import { useState } from "react";
import {
  LayoutDashboard, MapPin, Utensils, BookOpen, Bus, CalendarDays,
  PackageSearch, Wrench, Plus, Search, Clock3, Users, ArrowRight,
  CheckCircle2, X, Send, Sparkles, Navigation, ThumbsUp
} from "lucide-react";
import "./App.css";

const seedPlaces = [
  { id: 1, name: "Central Canteen", place: "Student Centre", type: "Food", crowd: 86, wait: 18 },
  { id: 2, name: "Main Library", place: "Academic Block", type: "Study", crowd: 42, wait: 0 },
  { id: 3, name: "North Cafe", place: "North Campus", type: "Food", crowd: 28, wait: 5 },
  { id: 4, name: "Innovation Hub", place: "Tech Block", type: "Study", crowd: 64, wait: 0 }
];

const seedEvents = [
  { id: 1, title: "Build Night: Ship a Side Project", club: "Developer Student Club", date: "12 NOV", time: "5:00 PM", place: "Innovation Hub", type: "Workshop", going: 64 },
  { id: 2, title: "OWASP Chapter Meetup", club: "OWASP Student Chapter", date: "14 NOV", time: "4:30 PM", place: "Seminar Hall 2", type: "Tech", going: 42 },
  { id: 3, title: "Campus Open Mic", club: "Cultural Committee", date: "16 NOV", time: "6:00 PM", place: "Amphitheatre", type: "Social", going: 89 }
];

export default function App() {
  const [page, S] = useState("Overview");
  const [places, P] = useState(seedPlaces);
  const [events, E] = useState(seedEvents);
  const [lost, L] = useState([
    { id: 1, item: "Black headphones", place: "Library, 2nd floor", kind: "Lost" },
    { id: 2, item: "Blue water bottle", place: "Outside Block A", kind: "Found" }
  ]);
  const [issues, I] = useState([
    { id: 1, title: "Wi-Fi not working in Block C", place: "Academic Block C", status: "In progress", votes: 12 },
    { id: 2, title: "Water cooler needs maintenance", place: "Hostel 4", status: "Reported", votes: 8 }
  ]);
  const [joined, J] = useState([]);
  const [voted, V] = useState([]);
  const [search, Q] = useState("");
  const [modal, M] = useState("");
  const [toast, T] = useState("");
  const [item, SI] = useState("");
  const [where, SW] = useState("");
  const [kind, SK] = useState("Lost");
  const [issue, SIssue] = useState("");
  const [issuePlace, SP] = useState("");

  const note = (t) => {
    T(t);
    setTimeout(() => T(""), 2300);
  };

  const nav = [
    ["Overview", LayoutDashboard],
    ["Campus Live", MapPin],
    ["Shuttle", Bus],
    ["Events", CalendarDays],
    ["Lost & Found", PackageSearch],
    ["Report an Issue", Wrench]
  ];

  const addLost = () => {
    if (!item.trim() || !where.trim()) return;

    L([{ id: Date.now(), item, place: where, kind }, ...lost]);
    SI("");
    SW("");
    M("");
    note("Listing posted to the campus community.");
  };

  const addIssue = () => {
    if (!issue.trim() || !issuePlace.trim()) return;

    I([
      { id: Date.now(), title: issue, place: issuePlace, status: "Reported", votes: 0 },
      ...issues
    ]);

    SIssue("");
    SP("");
    note("Issue submitted. Thanks for improving campus!");
  };

  const join = (id) => {
    if (joined.includes(id)) return;

    J([...joined, id]);
    E(events.map((e) =>
      e.id === id ? { ...e, going: e.going + 1 } : e
    ));

    note("You're on the list!");
  };

  const vote = (id) => {
    if (voted.includes(id)) return;

    V([...voted, id]);
    I(issues.map((x) =>
      x.id === id ? { ...x, votes: x.votes + 1 } : x
    ));
  };

  const crowd = (id) => {
    P(places.map((p) =>
      p.id === id
        ? {
            ...p,
            crowd: Math.max(
              0,
              Math.min(100, p.crowd + (p.crowd > 70 ? -8 : 7))
            )
          }
        : p
    ));

    note("Thanks for sharing a campus update.");
  };

  const visible = places.filter((p) =>
    (p.name + " " + p.place).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandicon"><Navigation /></div>
          <div>
            <b>CampusPulse</b>
            <small>YOUR CAMPUS, IN SYNC</small>
          </div>
        </div>

        <div className="campus">
          <b>Thapar University</b>
          <small>Patiala Campus</small>
        </div>

        <label className="navlabel">CAMPUS</label>

        {nav.map(([n, Icon]) => (
          <button
            key={n}
            onClick={() => S(n)}
            className={"nav " + (page === n ? "active" : "")}
          >
            <Icon size={18} />
            {n}
          </button>
        ))}

        <div className="sidebarbottom">
          <div className="live"><i /> Campus updates live</div>
          <div className="user">
            <div className="avatar">VG</div>
            <span>
              <b>Student account</b>
              <small>Semester 3</small>
            </span>
          </div>
        </div>
      </aside>

      <main>
        <header>
          <div className="crumb">
            CampusPulse <span>/</span> <b>{page}</b>
          </div>
          <div className="live"><i /> Campus updates live</div>
        </header>

        <div className="content">
          <div className="heading">
            <div>
              <div className="eyebrow">
                <Sparkles size={13} /> YOUR DAILY CAMPUS COMPANION
              </div>
              <h1>
                {page === "Overview" ? "Make the most of campus." : page}
              </h1>
              <p>Less waiting, less searching. More time for what matters.</p>
            </div>

            <div className="date">
              <small>MONDAY</small>
              <b>09 NOV</b>
              <small>Semester in session</small>
            </div>
          </div>

          {page === "Overview" && (
            <>
              <section className="hero">
                <div>
                  <small>CAMPUS AT A GLANCE</small>
                  <h2>Your campus is buzzing today.</h2>
                  <p>
                    Here's what's happening around you. Plan smarter, move faster.
                  </p>
                  <button className="primary" onClick={() => S("Campus Live")}>
                    Explore campus <ArrowRight size={15} />
                  </button>
                </div>

                <div className="heroart">
                  <div className="pin"><MapPin size={35} /></div>
                  <span>Library</span>
                  <span>Canteen</span>
                </div>
              </section>

              <div className="sectiontitle">
                <div>
                  <h2>Campus right now</h2>
                  <p>Student-reported crowd levels and availability</p>
                </div>
                <button className="link" onClick={() => S("Campus Live")}>
                  See all locations →
                </button>
              </div>

              <div className="places">
                {places.slice(0, 3).map((p) => (
                  <Place key={p.id} p={p} crowd={crowd} />
                ))}
              </div>

              <div className="columns">
                <section className="panel">
                  <div className="sectiontitle">
                    <div>
                      <h2>Coming up on campus</h2>
                      <p>Don't miss what's happening</p>
                    </div>
                    <button className="link" onClick={() => S("Events")}>
                      All events →
                    </button>
                  </div>

                  {events.slice(0, 2).map((e) => (
                    <EventRow
                      key={e.id}
                      e={e}
                      joined={joined.includes(e.id)}
                      join={join}
                    />
                  ))}
                </section>

                <section className="panel">
                  <div className="sectiontitle">
                    <div>
                      <h2>Campus shuttle</h2>
                      <p>Next arrival near you</p>
                    </div>
                    <span className="tag">LIVE</span>
                  </div>

                  <div className="shuttle">
                    <Bus size={28} />
                    <div>
                      <b>North Gate → Academic Block</b>
                      <small>Next shuttle arriving</small>
                    </div>
                    <strong>4 <small>min</small></strong>
                  </div>

                  <button className="link" onClick={() => S("Shuttle")}>
                    View shuttle routes →
                  </button>
                </section>
              </div>

              <div className="sectiontitle">
                <div>
                  <h2>Quick actions</h2>
                  <p>Get things sorted in a few taps</p>
                </div>
              </div>

              <div className="quick">
                <Quick
                  icon={PackageSearch}
                  title="Lost something?"
                  desc="Browse lost & found"
                  click={() => S("Lost & Found")}
                />
                <Quick
                  icon={Wrench}
                  title="Report a problem"
                  desc="Let campus services know"
                  click={() => S("Report an Issue")}
                />
                <Quick
                  icon={CalendarDays}
                  title="Find your people"
                  desc="Explore student events"
                  click={() => S("Events")}
                />
              </div>
            </>
          )}

          {page === "Campus Live" && (
            <>
              <div className="intro">
                <div>
                  <h2>Find your next stop.</h2>
                  <p>
                    Check crowd levels before you walk across campus.
                    Help everyone by sharing what you see.
                  </p>
                </div>
                <span className="tag">COMMUNITY UPDATES</span>
              </div>

              <div className="search">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(e) => Q(e.target.value)}
                  placeholder="Search campus locations..."
                />
              </div>

              <div className="places all">
                {visible.map((p) => (
                  <Place key={p.id} p={p} crowd={crowd} />
                ))}
              </div>

              <p className="disclaimer">
                Community-powered campus info. Crowd levels are sample
                student reports in this demo, not live sensor readings.
              </p>
            </>
          )}

          {page === "Shuttle" && (
            <>
              <div className="intro">
                <div>
                  <h2>Get there without the guesswork.</h2>
                  <p>Campus loop route with simulated arrival estimates.</p>
                </div>
                <Bus size={38} />
              </div>

              <div className="columns">
                <section className="panel">
                  <h2>Campus Loop · Route A</h2>
                  <p>North Gate → Academic Block → Hostels → Library</p>

                  {[
                    ["North Gate", "4 min"],
                    ["Academic Block", "8 min"],
                    ["Hostels", "12 min"],
                    ["Main Library", "15 min"]
                  ].map((s, i) => (
                    <div className="stop" key={s[0]}>
                      <span>{i + 1}</span>
                      <b>{s[0]}</b>
                      <strong>{s[1]}</strong>
                    </div>
                  ))}
                </section>

                <section className="panel">
                  <h2>Service information</h2>
                  <div className="detail">
                    <span>Operating hours</span><b>8 AM – 8 PM</b>
                  </div>
                  <div className="detail">
                    <span>Frequency</span><b>Every 15 minutes</b>
                  </div>
                  <div className="detail">
                    <span>Current status</span>
                    <b className="green">On schedule</b>
                  </div>
                  <p className="tip">
                    Travel tip: Avoid the 1–2 PM rush if you're heading
                    to the Central Canteen.
                  </p>
                </section>
              </div>
            </>
          )}

          {page === "Events" && (
            <>
              <div className="intro">
                <div>
                  <h2>Find your campus community.</h2>
                  <p>
                    Workshops, meetups, competitions and everything in between.
                  </p>
                </div>
                <span className="tag">{events.length} UPCOMING</span>
              </div>

              <div className="eventcards">
                {events.map((e) => (
                  <article className="eventcard" key={e.id}>
                    <div className="eventart">
                      <span>{e.date}</span>
                      <CalendarDays size={42} />
                    </div>

                    <div className="eventbody">
                      <small>{e.club} · {e.type}</small>
                      <h3>{e.title}</h3>
                      <p><Clock3 size={13} />{e.time}</p>
                      <p><MapPin size={13} />{e.place}</p>

                      <div className="eventfoot">
                        <span><Users size={14} />{e.going} going</span>
                        <button className="primary" onClick={() => join(e.id)}>
                          {joined.includes(e.id) ? "You're going" : "Register"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {page === "Lost & Found" && (
            <>
              <div className="intro">
                <div>
                  <h2>Lost something? Found something?</h2>
                  <p>Help reunite belongings with their owners.</p>
                </div>
                <button className="primary" onClick={() => M("lost")}>
                  <Plus size={15} /> Create listing
                </button>
              </div>

              <div className="search">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(e) => Q(e.target.value)}
                  placeholder="Search items or locations..."
                />
              </div>

              <div className="eventcards">
                {lost
                  .filter((x) =>
                    (x.item + x.place).toLowerCase().includes(search.toLowerCase())
                  )
                  .map((x) => (
                    <article className="lostcard" key={x.id}>
                      <div className="lostart">
                        <PackageSearch size={35} />
                        <span>{x.kind}</span>
                      </div>

                      <div className="eventbody">
                        <small>{x.kind.toUpperCase()} ITEM</small>
                        <h3>{x.item}</h3>
                        <p><MapPin size={13} />{x.place}</p>
                        <button
                          className="outline"
                          onClick={() =>
                            note("Demo: secure contact details would be shared here.")
                          }
                        >
                          {x.kind === "Lost" ? "I found this" : "This is mine"} →
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            </>
          )}

          {page === "Report an Issue" && (
            <div className="columns">
              <section className="panel">
                <h2>Make campus better.</h2>
                <p>Report a problem so the right team can take a look.</p>

                <label>What's the issue?</label>
                <input
                  className="field"
                  value={issue}
                  onChange={(e) => SIssue(e.target.value)}
                  placeholder="e.g. Projector not working in Room 204"
                />

                <label>Where is it?</label>
                <input
                  className="field"
                  value={issuePlace}
                  onChange={(e) => SP(e.target.value)}
                  placeholder="Building, floor, room or landmark"
                />

                <button className="primary submit" onClick={addIssue}>
                  <Send size={15} /> Submit report
                </button>
              </section>

              <section className="panel">
                <h2>Community issue board</h2>
                <p>Issues reported by students</p>

                {issues.map((x) => (
                  <div className="issue" key={x.id}>
                    <div>
                      <b>{x.title}</b>
                      <small>
                        <MapPin size={11} />
                        {x.place} · {x.status}
                      </small>
                    </div>

                    <button
                      className={voted.includes(x.id) ? "voted" : "vote"}
                      onClick={() => vote(x.id)}
                    >
                      <ThumbsUp size={14} />{x.votes}
                    </button>
                  </div>
                ))}
              </section>
            </div>
          )}
        </div>

        <footer>
          CampusPulse · Better campus days start here
          <span>Student-powered prototype · Sample data</span>
        </footer>
      </main>

      {modal && (
        <div className="shade" onClick={() => M("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => M("")}><X /></button>
            <h2>Create a lost & found listing</h2>
            <p>Help someone find what they're missing.</p>

            <label>Item name</label>
            <input
              className="field"
              value={item}
              onChange={(e) => SI(e.target.value)}
              placeholder="e.g. Black laptop sleeve"
            />

            <label>Where was it lost or found?</label>
            <input
              className="field"
              value={where}
              onChange={(e) => SW(e.target.value)}
              placeholder="e.g. Library, second floor"
            />

            <label>Listing type</label>
            <select
              className="field"
              value={kind}
              onChange={(e) => SK(e.target.value)}
            >
              <option>Lost</option>
              <option>Found</option>
            </select>

            <button className="primary submit" onClick={addLost}>
              Publish listing <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <CheckCircle2 size={16} />{toast}
        </div>
      )}
    </div>
  );
}

function Place({ p, crowd }) {
  const level = p.crowd > 70 ? "busy" : p.crowd > 40 ? "medium" : "quiet";

  return (
    <article className="place">
      <div className="placehead">
        <div className={"placeicon " + (p.type === "Food" ? "food" : "study")}>
          {p.type === "Food" ? <Utensils size={18} /> : <BookOpen size={18} />}
        </div>
        <span className={"status " + level}>
          {level === "busy" ? "Busy" : level === "medium" ? "Moderate" : "Low crowd"}
        </span>
      </div>

      <h3>{p.name}</h3>
      <p><MapPin size={12} />{p.place}</p>

      <div className="meterlabel">
        <span>Current crowd</span>
        <b>{p.crowd}%</b>
      </div>

      <div className="meter">
        <i className={level} style={{ width: p.crowd + "%" }} />
      </div>

      <div className="placefoot">
        <span>
          <Clock3 size={13} />
          {p.wait ? `${p.wait} min wait` : "No wait estimate"}
        </span>
        <button onClick={() => crowd(p.id)}>Update status</button>
      </div>
    </article>
  );
}

function EventRow({ e, joined, join }) {
  return (
    <div className="eventrow">
      <div className="datebox">
        <b>{e.date.split(" ")[0]}</b>
        <small>{e.date.split(" ")[1]}</small>
      </div>

      <div>
        <b>{e.title}</b>
        <small>{e.time} · {e.place}</small>
      </div>

      <button onClick={() => join(e.id)}>
        {joined ? "Joined" : "Join"}
      </button>
    </div>
  );
}

function Quick({ icon: Icon, title, desc, click }) {
  return (
    <button className="quickitem" onClick={click}>
      <Icon size={20} />
      <span>
        <b>{title}</b>
        <small>{desc}</small>
      </span>
      <ArrowRight size={15} />
    </button>
  );
}