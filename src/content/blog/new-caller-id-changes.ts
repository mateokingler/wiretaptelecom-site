import type { BlogPost } from "@/lib/blog-schema";

export const newCallerIdChanges: BlogPost = {
  slug: "new-caller-id-changes",
  title: "New Caller-ID Changes Are Here!",
  excerpt: "Learn about the FCC mandates and the STIR/SHAKEN framework.",
  category: "voice",
  author: "Mateo Aguirre",
  published: "2021-07-06",
  hero: {
    src: "/blog/new-caller-id-changes.png",
    alt: "Close-up of a smartphone screen displaying an incoming call notification",
  },
  blocks: [
    {
      kind: "text",
      body: "There is an FCC mandate imposed on carriers and it's happening on June 30th, 2021. This is to combat that annoying illegal robocalling problem that we all experience. Wiretap Telecom has been working with various government agencies to ensure that your calls receive the best attestation levels possible and we've complied with all mandates by becoming a certified STIR/SHAKEN service provider. This allows us to provide you with the highest possible ratings on your outbound calls.",
    },
    {
      kind: "heading",
      text: "What is STIR/SHAKEN?",
    },
    {
      kind: "text",
      body: 'STIR/SHAKEN is a new framework that the telecom industry has adopted. This framework requires that outgoing calls get "signed" by their provider so the receiving carrier can authenticate the call (i.e., guarantee the call came from its described location). Additionally, the originating carrier will provide a "grade" to each call, which is called an Attestation Level. Attestation Levels are as follows:',
    },
    {
      kind: "subheading",
      text: "Attestation Level A",
    },
    {
      kind: "text",
      body: "This is the highest level of attestation. Wiretap Telecom will sign your outgoing calls with this level of attestation if the caller-id you use matches an active number on your account. In other words, we know you, and we know your caller-id number.",
    },
    {
      kind: "subheading",
      text: "Attestation Level B",
    },
    {
      kind: "text",
      body: "Wiretap Telecom will sign your outgoing calls with this level of attestation if the caller-id doesn't match any active numbers on your account. In other words, we know you, but we don't know the number you're using in your caller-id.",
    },
    {
      kind: "subheading",
      text: "Attestation Level C",
    },
    {
      kind: "text",
      body: "This is the lowest level of attestation. Wiretap Telecom will currently not sign this attestation level since it is reserved for gateway services. This occurs when we don't know you and we don't know your number.",
    },
    {
      kind: "text",
      body: "If you're a Wiretap Telecom customer then your calls will receive attestation levels A, B, or a mixture of both. You will never receive the lowest attestation level (C).",
    },
    {
      kind: "heading",
      text: "How does this affect me?",
    },
    {
      kind: "text",
      body: "On each outbound call you make, your outbound caller-id number will receive an attestation level as described above. If you receive an attestation level A on a call then the receiving carrier service can choose to provide a green check mark, state that the call is a quality call, etc. At first, this is going to be more noticeable on cell phones.",
    },
    {
      kind: "text",
      body: "On the other hand, if you receive an attestation level B then certain providers and their customers might choose to block your calls. Please note that we will process your outbound call even if it's a B attestation level. Additionally, calls that are sent with this attestation level could receive a notice on the receiving party's phone stating that the call is of low quality and with an optional \"potentially spam\" message.",
    },
    {
      kind: "text",
      body: "Wiretap Telecom doesn't have control over how the receiving party and their carrier services respond to the B attestation level, so we highly recommend that you ensure that your outbound caller-id always represents a phone number on your Wiretap Telecom account. In other words, if you can receive a call from a number (your direct inward dial number) then consider using that number, or another number on your account, as your outbound caller-id number.",
    },
    {
      kind: "heading",
      text: "How do I verify my Attestation level?",
    },
    {
      kind: "text",
      body: "An attestation level is assigned on every call. This type of 'grade' doesn't improve or degrade over time as it is on a call-by-call basis. If you desire to verify your outbound attestation level (i.e., your outbound call grades) then visit the Wiretap Telecom customer portal and view your call detail records. Each call record will contain a visible attestation level.",
    },
  ],
};
