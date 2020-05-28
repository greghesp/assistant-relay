/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
//import IdealImage from '@theme/IdealImage';


import styles from './styles.module.css';

export default {
  code: (props) => {
    const {children} = props;
    if (typeof children === 'string') {
      return <CodeBlock {...props} />;
    }
    return children;
  },
  a: (props) => {
    if (/\.[^./]+$/.test(props.href)) {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...props} />;
    }
    return <Link {...props} />;
  },
  pre: (props) => <div className={styles.mdxCodeBlock} {...props} />,
  h1: Heading('h1'),
  h2: Heading('h2'),
  h3: Heading('h3'),
  h4: Heading('h4'),
  h5: Heading('h5'),
  h6: Heading('h6'),
  img: (props) => {
    const image = require(`../../../../docs/_assets/${props.src}`);
    let alt = props.alt || '';
    if (alt.startsWith('hide:')) {
      alt = alt.replace('hide:', '');
    }

    return (
        <figure className={styles.figure}>
          <img src={image.src.src} alt={alt}/>
          {alt === props.alt && <figcaption>{alt}</figcaption>}
        </figure>
    );
  }
  // img: (props) => {
  //   console.log(props)
  //   let alt = props.alt || '';
  //
  //   // Prefix any alt tags with "hide:" to not show them as a caption
  //   if (alt.startsWith('hide:')) {
  //     alt = alt.replace('hide:', '');
  //   }
  //
  //   return (
  //       <figure className={styles.figure}>
  //           <IdealImage
  //               img={require(`../../../../docs/_assets/${props.src ?? ''}`)}
  //               alt={alt}
  //               quality={100}
  //           />
  //         {alt === props.alt && <figcaption>{alt}</figcaption>}
  //       </figure>
  //   );
  // },
};
