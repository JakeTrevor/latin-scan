import React from "react";

export function About() {
  return (
    <div className="about">
      <div className="about-box">
        <h1>Where am I?</h1>
        <p>
          Latin-Scan.com is an automatic latin scansion tool - if you don't
          already know what that means, it's probably not for you. It is a hobby
          project of one person. A support/contact email is in the works.
        </p>

        <h1>What is scansion?</h1>
        <p>
          Scansion is the process of determining the meter (rhythm) of poetry.
          In latin, this is done through a combination of following some rules,
          and through a process of elimination. First, you determine the
          "quantity" or length of each vowel in the line. you then compare this
          to a small number of patterns that the line could take. the pattern
          you have left (and hopefully, it will only be one) is that line's
          rhythm.
        </p>

        <h1>Can you explain the rules?</h1>
        <p>
          A good explanation can be found{" "}
          <a
            href="http://www.thelatinlibrary.com/satire/scansion.pdf"
            target="_blank"
          >
            here
          </a>
          .
        </p>

        <h1>A note on capabilities</h1>
        <p>
          Unfortunatley, the system behind latin-scan.com is not perfect. it
          cannot, as a rule, detect vowels that have quantity by nature; many of
          these require checking if a word is of a specific class (for instance,
          a first declension ablative noun with an -a ending). This kind of
          check is much harder to implement, and so it is unlikely I will ever
          implement it. As a rule, modifications to how quantity is detected is
          not possible.
        </p>
        <p>
          It is also very difficult to deal with situations where a poet has
          broken the rules. The opening of Virgil's eclogue 1 is a good example
          of this, where the word "patriae" contains a long-short-long pattern
          that cannot be scanned.
        </p>
        <p>
          on the upside, however: this site is still under construction! I plan
          to add some other meters and a few other features as well.
        </p>
      </div>
    </div>
  );
}
