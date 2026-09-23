/**
 * m3-expressive-web — a community port of Material 3 Expressive to the web.
 *
 * Exposes all components and primitives. Import this module once, then use
 * the custom elements in HTML or any framework.
 *
 * @packageDocumentation
 */

// Design tokens (import for side effect: injects baseline theme CSS)
import './tokens/m3-tokens.css';

// Motion
export * from './motion/springs.js';

// Shape library
export * from './shape/shapes.js';

// Internal primitives (usually not used directly, but exported for porters)
export { MdStateLayer } from './internal/state-layer.js';
export { MdRipple } from './internal/ripple.js';
export { MdElevation } from './internal/elevation.js';
export { MdFocusRing } from './internal/focus-ring.js';

// Components
export * from './components/button/index.js';
export { MdButtonGroup } from './components/button-group/md-button-group.js';
export { MdLoadingIndicator } from './components/loading-indicator/md-loading-indicator.js';
export { MdFabMenu } from './components/fab-menu/md-fab-menu.js';
