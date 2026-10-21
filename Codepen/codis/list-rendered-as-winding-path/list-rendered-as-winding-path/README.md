# List rendered as winding path

A Pen created on CodePen.

Original URL: [https://codepen.io/luisangelmaciel/pen/xxvzdgx](https://codepen.io/luisangelmaciel/pen/xxvzdgx).

Renders as a stacked list on small screens - a winding path on larger screens.

Notes:
- Flexbox is used for the path layout. A 3x3 grid with a connecting path. The path is a single SVG graphic that is rendered into each card background at 300% background size. The background-position controls what small part we see.
- In the path layout, we need to reverse the flexbox render order of 4,5 and 6 to make it follow the path. 
- 2 SVG graphics are used - the path and the lock. 
- The SVGs are hardcoded into the CSS as Sass variables. This means we can tweak the SVG path and colors without leaving the CSS.
- I'm using a lot of VW units to keep the aspect ratios - and relative positions. 