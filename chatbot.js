// EMMAX Concepts website assistant (scripted, no AI service or account needed)
(function () {
  var FORM = "https://formspree.io/f/moejpdry";
  var WA = "https://wa.me/2348023058277";
  var EMAIL = "emmaxconcepts005@gmail.com";

  // ---- Answers ---------------------------------------------------------
  var A = {
    start: {
      text: "Hi! I'm the EMMAX assistant. I can tell you about AI voice agents, automations, pricing and how to get started. What would you like to know?",
      opts: ["services", "voice", "pricing", "process", "demos", "lead", "human"]
    },
    services: {
      text: "EMMAX Concepts builds:<br>• <b>AI voice agents</b> that answer calls, qualify callers and book appointments<br>• <b>Workflow automation</b> with n8n, Make.com and Zapier<br>• <b>CRM automation</b> for GoHighLevel, HubSpot, Pipedrive and Zoho<br>• <b>Lead generation</b> and qualification<br>• <b>WhatsApp and SMS</b> messaging<br>• <b>AI video</b> and creative production",
      link: ["See all services", "services.html"],
      opts: ["voice", "crm", "pricing", "lead"]
    },
    voice: {
      text: "An AI voice agent answers your phone like a receptionist. It can answer common questions, collect caller details, qualify leads, book or reschedule appointments in your calendar, transfer urgent calls and update your CRM. It can also make outbound calls for follow-up and confirmations.",
      opts: ["transfer", "crm", "demos", "pricing"]
    },
    crm: {
      text: "Yes, usually. I connect to GoHighLevel, HubSpot, Pipedrive, Zoho, Google Sheets, Google Calendar and webhook-based systems. We confirm exactly what your setup supports during the free discovery chat.",
      opts: ["voice", "process", "lead"]
    },
    transfer: {
      text: "Yes. You set the rules. The agent can transfer urgent calls to you or your team, take a message, or create a callback task in your CRM when it can't handle something.",
      opts: ["voice", "pricing", "lead"]
    },
    pricing: {
      text: "Pricing depends on what's being built: a single voice agent costs less than a system with several integrations. After a free discovery chat you get a clear proposal with the price before any work starts.",
      opts: ["lead", "process", "human"]
    },
    process: {
      text: "It works in 5 steps:<br>1. <b>Discovery</b>: we talk about your calls, leads and tools<br>2. <b>Design</b>: I map the workflow and you approve it<br>3. <b>Build</b>: the agent and automations are connected<br>4. <b>Test</b>: we run real scenarios together<br>5. <b>Launch</b>: it goes live with your sign-off and documentation",
      link: ["See the full process", "how-it-works.html"],
      opts: ["time", "pricing", "lead"]
    },
    time: {
      text: "It depends on the scope. A focused voice agent is much quicker than a multi-system build. You'll get a timeline in the proposal after discovery.",
      opts: ["lead", "process"]
    },
    demos: {
      text: "You can watch recorded demos of real voice agents, including a real-estate assistant and Retell AI agents, on the Projects page.",
      link: ["Watch the demos", "projects.html#demos"],
      opts: ["services", "lead"]
    },
    industries: {
      text: "It suits any business that relies on calls and bookings: pest control, home services, real estate, clinics, local services, agencies, sales teams and customer support.",
      link: ["See industry pages", "industries.html"],
      opts: ["voice", "lead"]
    },
    ai: {
      text: "Modern voice agents sound natural, but I recommend being upfront with callers. How the agent introduces itself is something we agree on together.",
      opts: ["voice", "demos"]
    },
    about: {
      text: "EMMAX Concepts is run by Emmanuel Olorunsola, an AI voice agent and automation specialist. His approach: start from the business problem, build only what's needed, test it properly and explain how it works.",
      link: ["About Emmanuel", "about.html"],
      opts: ["human", "lead"]
    },
    human: {
      text: "You can reach Emmanuel directly:",
      contact: true,
      opts: ["lead", "start"]
    },
    fallback: {
      text: "I'm not sure I understood that. I'm a simple assistant, so Emmanuel can answer properly. You could leave your details, message him on WhatsApp, or pick a topic below.",
      opts: ["lead", "human", "services", "pricing"]
    }
  };
  var LABELS = {
    services: "What do you build?", voice: "How does a voice agent work?", pricing: "How much does it cost?",
    process: "How does it work?", demos: "Show me demos", lead: "Get a free consultation", human: "Talk to Emmanuel",
    crm: "Does it work with my CRM?", transfer: "Can it transfer calls?", time: "How long does it take?", start: "Main menu"
  };
  var KEYWORDS = [
    ["pricing", /price|pricing|cost|how much|budget|fee|charge|rate|cheap|expensive|pay/],
    ["time", /how long|timeline|time frame|timeframe|weeks?|days?|quick|fast|deadline/],
    ["crm", /crm|hubspot|gohighlevel|ghl|high ?level|pipedrive|zoho|calendar|sheet|integrat/],
    ["transfer", /transfer|human|real person|escalat|hand ?off|forward/],
    ["ai", /robot|know.*ai|sound|natural|voice quality|fake/],
    ["demos", /demo|example|sample|portfolio|project|video|watch/],
    ["voice", /voice|call|phone|receptionist|answer|inbound|outbound|retell|vapi|twilio/],
    ["process", /process|steps?|how does it work|how do you work|start|get started|onboard/],
    ["industries", /industr|business|pest|clinic|dental|real estate|realtor|home service|plumb|hvac|agency|niche/],
    ["about", /who are you|emmanuel|about|founder|experience|upwork/],
    ["lead", /consult|quote|proposal|book|meeting|interested|hire|sign up|discovery/],
    ["human", /contact|email|whatsapp|talk to|speak|reach|number/],
    ["services", /service|offer|build|do you do|automat|zapier|make\.com|n8n|lead gen|whatsapp|sms|chatbot|video/],
    ["start", /^(hi|hello|hey|good (morning|afternoon|evening)|menu|help)\b/]
  ];

  // ---- UI --------------------------------------------------------------
  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var root = document.createElement("div");
  root.className = "cb";
  root.innerHTML =
    '<div class="cb-panel" id="cb-panel" role="dialog" aria-label="Chat with the EMMAX assistant" hidden>' +
      '<div class="cb-head"><span class="cb-av" aria-hidden="true"><img src="images/logo-mark.png" alt=""></span><div><b>EMMAX Assistant</b><span>Usually replies instantly</span></div>' +
      '<button class="cb-close" type="button" aria-label="Close chat">' + ICON_X + '</button></div>' +
      '<div class="cb-log" role="log" aria-live="polite"></div>' +
      '<div class="cb-opts"></div>' +
      '<form class="cb-input"><label class="sr" for="cb-text">Type your question</label><input id="cb-text" autocomplete="off" placeholder="Type your question..."><button type="submit" aria-label="Send">' + ICON_SEND + '</button></form>' +
    '</div>' +
    '<button class="cb-btn" type="button" aria-expanded="false" aria-controls="cb-panel"><span class="cb-ico-open">' + ICON_CHAT + '</span><span class="cb-ico-close">' + ICON_X + '</span><span class="sr">Chat with us</span></button>' +
    '<div class="cb-hint" aria-hidden="true">Questions? Chat with us</div>';
  document.body.appendChild(root);

  var panel = root.querySelector(".cb-panel"), btn = root.querySelector(".cb-btn"), log = root.querySelector(".cb-log"),
      optsEl = root.querySelector(".cb-opts"), form = root.querySelector(".cb-input"), input = root.querySelector("#cb-text"),
      hint = root.querySelector(".cb-hint");
  var started = false, leadStep = null, lead = {};

  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function scroll() { log.scrollTop = log.scrollHeight; }
  function add(html, who) {
    var m = document.createElement("div");
    m.className = "cb-msg " + (who || "bot");
    m.innerHTML = html;
    log.appendChild(m); scroll();
    return m;
  }
  function typing(cb) {
    var t = add('<span class="cb-dots"><i></i><i></i><i></i></span>', "bot typing");
    setTimeout(function () { t.remove(); cb(); }, 550);
  }
  function setOpts(keys) {
    optsEl.innerHTML = "";
    (keys || []).forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = LABELS[k] || k;
      b.addEventListener("click", function () { add(esc(b.textContent), "me"); go(k); });
      optsEl.appendChild(b);
    });
    scroll();
  }
  function contactHtml() {
    return '<div class="cb-links"><a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:' + EMAIL + '">Email</a><a href="contact.html">Contact page</a></div>';
  }
  function go(key) {
    if (key === "lead") return startLead();
    var a = A[key] || A.fallback;
    setOpts([]);
    typing(function () {
      var html = a.text;
      if (a.link) html += '<a class="cb-more" href="' + a.link[1] + '">' + a.link[0] + ' &rarr;</a>';
      if (a.contact) html += contactHtml();
      add(html);
      setOpts(a.opts);
    });
  }
  function match(text) {
    var t = text.toLowerCase();
    for (var i = 0; i < KEYWORDS.length; i++) if (KEYWORDS[i][1].test(t)) return KEYWORDS[i][0];
    return "fallback";
  }

  // ---- Lead capture ----------------------------------------------------
  function startLead() {
    lead = {}; leadStep = "name"; setOpts([]);
    typing(function () { add("Great, let's set up a free discovery chat. First, what's your name?"); input.focus(); });
  }
  function leadInput(text) {
    if (leadStep === "name") {
      lead.name = text; leadStep = "email";
      typing(function () { add("Thanks, " + esc(text.split(" ")[0]) + "! What's the best email to reach you?"); });
    } else if (leadStep === "email") {
      if (!/^\S+@\S+\.\S+$/.test(text)) { typing(function () { add("That doesn't look like an email address. Could you check it?"); }); return; }
      lead.email = text; leadStep = "need";
      typing(function () {
        add("What would you like help with?");
        optsEl.innerHTML = "";
        ["AI voice agent", "Workflow automation", "CRM automation", "Lead generation", "Messaging", "Not sure yet"].forEach(function (n) {
          var b = document.createElement("button"); b.type = "button"; b.textContent = n;
          b.addEventListener("click", function () { add(esc(n), "me"); leadInput(n); });
          optsEl.appendChild(b);
        });
        scroll();
      });
    } else if (leadStep === "need") {
      lead.need = text; leadStep = "details"; setOpts([]);
      typing(function () { add("Last one: tell me a little about your business or what you'd like to automate. (Or type <b>skip</b>.)"); });
    } else if (leadStep === "details") {
      lead.details = /^skip$/i.test(text) ? "" : text; leadStep = null;
      send();
    }
  }
  function send() {
    var fd = new FormData();
    fd.append("_subject", "New chatbot lead from the EMMAX Concepts website");
    fd.append("name", lead.name); fd.append("email", lead.email);
    fd.append("need", lead.need); fd.append("details", lead.details || "");
    fd.append("source", "Website chatbot (" + location.pathname + ")");
    var t = add('<span class="cb-dots"><i></i><i></i><i></i></span>', "bot typing");
    fetch(FORM, { method: "POST", body: fd, headers: { Accept: "application/json" } })
      .then(function (r) {
        t.remove();
        if (r.ok) add("Thanks! Your details have been sent to Emmanuel. He'll reply by email or WhatsApp. If it's urgent, you can message him now:" + contactHtml());
        else add("Sorry, that didn't send. Please message Emmanuel directly instead:" + contactHtml());
        setOpts(["services", "demos", "start"]);
      })
      .catch(function () {
        t.remove();
        add("Sorry, that didn't send. Check your connection, or message Emmanuel directly:" + contactHtml());
        setOpts(["start"]);
      });
  }

  // ---- Events ----------------------------------------------------------
  function open() {
    panel.hidden = false; root.classList.add("open"); btn.setAttribute("aria-expanded", "true"); hint.remove();
    if (!started) { started = true; go("start"); }
    setTimeout(function () { input.focus({ preventScroll: true }); }, 50);
  }
  function close() { panel.hidden = true; root.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
  btn.addEventListener("click", function () { panel.hidden ? open() : close(); });
  root.querySelector(".cb-close").addEventListener("click", close);
  panel.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim(); if (!text) return;
    input.value = ""; add(esc(text), "me");
    if (leadStep) leadInput(text); else go(match(text));
  });
  setTimeout(function () { if (hint.isConnected) hint.classList.add("show"); }, 4000);
  hint.addEventListener("click", open);
})();
