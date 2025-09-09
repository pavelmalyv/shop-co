import "flowbite";
import * as z from "zod";

import { ru } from "zod/locales";
import { TopBannerCollection } from "./features/top-banner";
import { CategorySliderCollection } from "./features/category-slider";
import { ReviewsSliderCollection } from "./features/reviews-slider";
import { NewsletterCollection } from "./features/newsletter";
import { ProductSliderCollection } from "./features/product-slider";
import { AddCartCollection } from "./features/add-cart";
import { RangeCollections } from "./features/range";
import { CartCollection } from "./features/cart";

z.config(ru());

new TopBannerCollection();
new CategorySliderCollection();
new ReviewsSliderCollection();
new NewsletterCollection();
new ProductSliderCollection();
new AddCartCollection();
new RangeCollections();
new CartCollection();
