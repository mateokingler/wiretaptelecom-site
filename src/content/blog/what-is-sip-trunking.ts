import type { BlogPost } from "@/lib/blog-schema";

export const whatIsSipTrunking: BlogPost = {
  slug: "what-is-sip-trunking",
  title: "What is a SIP Trunk?",
  excerpt: 'We are often asked, "what is a SIP trunk?" Let us have a discussion.',
  category: "voice",
  author: "Mateo Aguirre",
  published: "2021-02-10",
  hero: {
    src: "/blog/what-is-sip-trunking.jpeg",
    alt: "Three vintage rotary payphones mounted on a patterned wall.",
  },
  blocks: [
    {
      kind: "heading",
      text: "SIP Trunking, huh?",
    },
    {
      kind: "text",
      body: "The term SIP trunk is used broadly and many times incorrectly throughout the telecommunications industry. Although phone technology has been around for more than a century, SIP trunking became possible only 25 years ago. This article will explain what a SIP trunk is and how its definition has been blurred throughout the telecom industry.",
    },
    {
      kind: "heading",
      text: "VoIP vs. SIP, what's the difference?",
    },
    {
      kind: "text",
      body: "The telecom industry is full of acronyms and duplicate terms. A VoIP trunk and a SIP trunk refer to the same technology. It is important to understand that many processes are required to establish, conduct, and terminate a phone call using the internet.",
    },
    {
      kind: "text",
      body: "Before SIP trunks (and VoIP), phone systems were expensive and hardware-based. Specially designed equipment was manufactured to act as a phone system, known as a PBX (Private Branch Exchange). Unlike today's software-based PBXs, calls in the past were not digitized and sent through the internet. Several factors prevented this until the late 1990s, including:",
    },
    {
      kind: "text",
      body: "The internet was either nonexistent or unreliable with poor bandwidth. Computer processing power was insufficient or too expensive to process human voices reliably. Protocols and software had not yet been established. Some might argue that telephony is more complicated today. Although this may be true from a software and data perspective, the hardware has become homogenized, allowing a PBX to run on standard computers (servers) without specialized equipment.",
    },
    {
      kind: "text",
      body: "As a result, the cost of PBXs has dropped significantly. With the invention of SIP trunks, a phone call can be successfully established and completed from two separate locations using even minimal hardware like Raspberry Pi's. This would have been impossible without the innovations discussed here.",
    },
    {
      kind: "heading",
      text: "So, what is a Trunk?",
    },
    {
      kind: "text",
      body: "Pipe + Data = SIP Trunk",
    },
    {
      kind: "text",
      body: "At a high level, you can think of SIP trunking as a non-physical pipe with destination devices at each end. Most commonly, one side of a trunk is a PBX, and the other side is either another PBX or a carrier service. A carrier service, such as Wiretap Telecom, routes calls to and from PBXs worldwide. When a pipe (trunk) is connected, data flows through it asynchronously. SIP protocols, among others, organize this data.",
    },
    {
      kind: "text",
      body: "In its simplest form, a SIP trunk is a virtual pipe with structured data flowing through it.",
    },
    {
      kind: "heading",
      text: "SIP Trunk vs. Call Path",
    },
    {
      kind: "text",
      body: "A SIP trunk can be referred to as a VoIP trunk, but calling it a call path is incorrect and typically leads to confusion. Unfortunately, some providers use these terms interchangeably.",
    },
    {
      kind: "text",
      body: "There are fundamental differences between a SIP trunk and a call path. A SIP trunk can be thought of as a pipe, whereas a call path refers to a phone call with two-way (asynchronous) communication. You might have already figured this out, but a call path lives inside a SIP trunk. This means that a SIP trunk can have many active call paths inside it at any given time. Taking this one step further, only one SIP trunk needs to exist in a peer-to-peer connection.",
    },
    {
      kind: "text",
      body: "Telecom providers, like Wiretap Telecom, typically offer products with limited and unlimited call paths. A SIP trunk contains call paths, and while call paths are not a technology, they represent the data flowing through a SIP trunk. Regardless of the product, only one SIP trunk is needed.",
    },
    {
      kind: "heading",
      text: "Putting It All Together",
    },
    {
      kind: "text",
      body: "As with any technology, putting it all together complicates what appears simple at first glance. For example, in a realistic environment, a phone call will consist of a phone connected via a private local area network (LAN) to a PBX. The PBX would be connected to a carrier service such as Wiretap Telecom via a SIP Trunk. The carrier service would then connect to the PSTN (Public Switched Telephone Network), traversing multiple carriers to establish the call. Eventually, another SIP trunk could be on the receiving end of the call, connected to a receiving PBX, which then routes the call to the receiving party.",
    },
    {
      kind: "text",
      body: "As one can imagine, the technologies involved in producing a single call are immense. In reality, SIP trunking plays a small but critical role in facilitating phone calls.",
    },
    {
      kind: "text",
      body: "In closing, SIP trunks operate over existing internet connections, traversing various internet pathways using the SIP protocol. This protocol consists of small packets of information flowing between systems. SIP is the data, and trunking is the method of transport.",
    },
  ],
};
