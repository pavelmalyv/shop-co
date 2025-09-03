import "flowbite";
import * as z from "zod";
import { TopBannerCollection } from "./TopBanner";
import { CategorySliderCollection } from "./CategorySlider";
import { ReviewsSliderCollection } from "./ReviewsSlider";
import { NewsletterCollection } from "./Newsletter";
import { ProductSliderCollection } from "./ProductSlider";
import { AddCartCollection } from "./AddCart";
import { RangeCollections } from "./Range";
import { CartCollection } from "./Cart";
import { ru } from "zod/locales";

z.config(ru());

new TopBannerCollection();
new CategorySliderCollection();
new ReviewsSliderCollection();
new NewsletterCollection();
new ProductSliderCollection();
new AddCartCollection();
new RangeCollections();
new CartCollection();
