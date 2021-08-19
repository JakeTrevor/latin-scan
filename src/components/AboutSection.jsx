import React from "react";
import About from "./About";
import "../index.css";

export default function AboutSection() {
  return (
    <About title="About">
      <About title="Where am I?">
        Latin-Scan.com is an automatic latin scansion tool - if you don't
        already know what that means, it's probably not for you. It is a hobby
        project of one person. A support/contact email is in the works.
      </About>
      <About title="What is Scansion?">
        Scansion is the process of determining the meter (rhythm) of poetry. In
        latin, this is done through a combination of following some rules, and
        through a process of elimination. First, you determine the "quantity" or
        length of each vowel in the line. You then compare this to a small
        number of patterns that the line could take on. The pattern you have
        left (and hopefully, it will only be one) is that line's rhythm.
      </About>
      <About title="What are the Rules?">
        <a
          href="http://www.thelatinlibrary.com/satire/scansion.pdf"
          target="_blank"
        >
          This PDF
        </a>{" "}
        is a good place to start.
      </About>
      <About title="Usage">
        Before you begin, ensure that you have the correct meter selected at the
        top. If you are scanning elegaic couplets, check that the first line is
        set correctly too. When you enter text, an output will be generated on
        the right. A red box indicates an incomplete line. A green box indicates
        a full scan. Clicking on a line in the output will allow you to see all
        the information about that line at once - you can select which version
        you want to diplay by clicking on it.
        <h3>forcing vowels</h3>
        You can also force a vowel to take on a given quantity. simply type "_"
        (underscore) before a vowel to make it long, or "@" (at) before a vowel
        to make it short. This can be useful if the line isnt scanning right. On
        mobile, a "Go" button will be in the top right corner - press this to
        switch between the input and output.
      </About>
      <About title="Capabilities">
        Unfortunatley, the system behind latin-scan.com is not perfect. It
        cannot, as a rule, detect vowels that have quantity by nature; many of
        these require checking if a word is of a specific class (for instance, a
        first declension ablative noun with an -a ending). This kind of check is
        much harder to implement, and so it is unlikely I will ever be able to
        implement it. As a rule, modifications to how quantity is detected is
        not possible.
        <p>
          It is also very difficult to deal with situations where a poet has
          broken the rules. The opening of Virgil's eclogue 1 is a good example
          of this, where the word "patriae" contains a long-short-long pattern
          that cannot be scanned. This can be fixed however, by forcing the
          quantity of one of the concerned lines.
        </p>
        on the upside: this site is still under construction! New Features are
        incoming.
      </About>
    </About>
  );
}
