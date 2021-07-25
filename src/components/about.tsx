import React from "react";
import { CSSTransition } from "react-transition-group";

export function About({ aboutOpen }) {
  return (
    <div className="about">
      <CSSTransition
        in={aboutOpen}
        unmountOnExit
        timeout={500}
        classNames="about-menu"
      >
        <div className="about-box">
          <h1>Where am I?</h1>
          <p>
            Latin-Scan.com is an automatic latin scansion tool - if you don't
            already know what that means, it's probably not for you. It is a
            hobby project of one person. A support/contact email is in the
            works.
          </p>

          <h1>What is scansion?</h1>
          <p>
            Scansion is the process of determining the meter (rhythm) of poetry.
            In latin, this is done through a combination of following some
            rules, and through a process of elimination. First, you determine
            the "quantity" or length of each vowel in the line. you then compare
            this to a small number of patterns that the line could take. the
            pattern you have left (and hopefully, it will only be one) is that
            line's rhythm.
          </p>

          <h1>Can you explain the rules?</h1>
          <p>
            <a
              href="http://www.thelatinlibrary.com/satire/scansion.pdf"
              target="_blank"
            >
              This PDF
            </a>{" "}
            is a good place to start.
          </p>

          <h1>Usage</h1>
          <p>
            Before you begin, ensure that you have the correct meter selected at
            the top. If you are scanning elegaic couplets, check that the first
            line is set correctly too. When you enter text, an output will be
            generated on the right. A red box indicates an incomplete line. A
            green box indicates a full scan. Clicking on a line in the output
            will allow you to see all the information about that line at once -
            you can select which version you want to diplay by clicking on it.{" "}
          </p>
          <p>
            You can also force a vowel to take on a given quantity. simply type
            "_" (underscore) before a vowel to make it long, or "@" (at) before
            a vowel to make it short. This can be useful if the line isnt
            scanning right.
          </p>

          <h1>A note on capabilities</h1>
          <p>
            Unfortunatley, the system behind latin-scan.com is not perfect. It
            cannot, as a rule, detect vowels that have quantity by nature; many
            of these require checking if a word is of a specific class (for
            instance, a first declension ablative noun with an -a ending). This
            kind of check is much harder to implement, and so it is unlikely I
            will ever be able to implement it. As a rule, modifications to how
            quantity is detected is not possible.
          </p>
          <p>
            It is also very difficult to deal with situations where a poet has
            broken the rules. The opening of Virgil's eclogue 1 is a good
            example of this, where the word "patriae" contains a long-short-long
            pattern that cannot be scanned. This can be fixed however, by
            forcing the quantity of one of the concerned lines.
          </p>
          <p>
            on the upside: this site is still under construction! New Features
            are incoming.
          </p>
        </div>
      </CSSTransition>
    </div>
  );
}
