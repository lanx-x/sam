/**
 * broadcast controller
 */

import { factories } from '@strapi/strapi';
import { createLocaleFallbackController } from "../../../utils/create-locale-fallback-controller";

export default createLocaleFallbackController('api::broadcast.broadcast');
