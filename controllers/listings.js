const Listing = require("../models/listing");


module.exports.index = async (req, res) => {
   const allListings =  await Listing.find({});
   res.render("listings/index", { allListings })
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
}

module.exports.showListing = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        },
    }).populate('owner');
    if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
}
    res.render("listings/show", { listing});
}

module.exports.createListing = async (req, res) => {
          
          const newListing = new Listing(req.body.listing);
          newListing.owner = req.user._id;
          if(typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            newListing.image.filename = filename;
            newListing.image.url = url;
            
          }
          await newListing.save();
          req.flash("success", "Successfully created a new listing!");
          res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit", { listing, originalImageUrl });
}

module.exports.updateListing =async (req, res) => {
    let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
   if(typeof req.file !== "undefined") {
    let url = req.file.path;
   let filename = req.file.filename;
   listing.image.filename = filename;
   listing.image.url = url;
   await listing.save();
   }
   req.flash("success", "Successfully updated the listing!");
   res.redirect(`/listings/${id}`);
} 

module.exports.destroyListing = async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id); 
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
}