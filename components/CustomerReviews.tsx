"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, CheckCircle2, Send, Plus } from "lucide-react";
import { initialReviews, CustomerReview } from "@/lib/links-config";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<CustomerReview[]>(initialReviews);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newProduct, setNewProduct] = useState("Artisan Biker Jacket");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor && newComment) {
      const created: CustomerReview = {
        id: `rev-${Date.now()}`,
        author: newAuthor,
        location: newLocation || "Verified Customer",
        productName: newProduct,
        rating: newRating,
        date: "Just now",
        comment: newComment,
        verifiedPurchase: true,
      };

      setReviews([created, ...reviews]);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setShowAddForm(false);
        setNewAuthor("");
        setNewComment("");
      }, 2000);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 mb-8 text-left">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-brand-accent block">
            Customer Feedback
          </span>
          <h3 className="font-serif text-2xl font-bold text-brand-primary tracking-tight">
            Verified Owner Reviews
          </h3>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-accent text-white hover:bg-brand-accent-hover transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Review Submission Form Drawer */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddReview}
            className="mb-4 p-4 rounded-2xl border border-brand-strong bg-brand-card space-y-3 shadow-sm overflow-hidden"
          >
            <h4 className="font-semibold text-xs text-brand-primary uppercase tracking-wider">
              Submit Your Product Experience
            </h4>

            <div>
              <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">
                Your Rating
              </label>
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${star <= newRating ? "fill-amber-500 text-amber-500" : "text-brand-subtle"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                required
                placeholder="Product Name (e.g. Shearling Coat)"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <textarea
                required
                rows={3}
                placeholder="Share your thoughts on craftsmanship, leather quality, or sizing..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-brand-primary border border-brand-subtle text-xs text-brand-primary focus:outline-none focus:border-brand-accent resize-none"
              />
            </div>

            {isSubmitted ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs text-center font-medium flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Your review has been published.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-accent text-white font-medium text-xs uppercase tracking-wider hover:bg-brand-accent-hover transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Review</span>
              </button>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      {/* Review List */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-2xl border border-brand-subtle bg-brand-card space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-brand-primary">{rev.author}</span>
                <span className="text-[10px] text-brand-muted">({rev.location})</span>
              </div>

              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-brand-accent font-medium">
              <span>{rev.productName}</span>
              {rev.verifiedPurchase && (
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Owner</span>
                </span>
              )}
            </div>

            <p className="text-xs text-brand-primary leading-relaxed font-normal">
              "{rev.comment}"
            </p>

            <span className="text-[10px] text-brand-muted block text-right font-normal">
              {rev.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
