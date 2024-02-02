Mobile App Metadata
===================

Description
-----------
As part of the mobile app upload process, you will want to provide metadata to allow for app categorization in the App / Play store. This
allows you to provide information about the application to potential customers.

Metadata is stored in an optional `data.json` file located in `./src/packages/`. If provided, we parse that file to populate the available
metadata options during upload.

The metadata available depends on the store being used.

Play Store Metadata Options
---------------------------
The following options are available for Play store projects:

### Full Description
This is sourced from `.android_app_categorization.product_details.full_description` in the metadata file.

### Short Desctiption
This is sourced from `.android_app_categorization.product_details.promotional_text` in the metadata file.

### Title
This is sourced from `.android_app_categorization.product_details.title` in the metadata file.

### Video
This is currently unused, but is expected to be a URL to a video file.

App Store Metadata Options
--------------------------
The following options are available for App store projects:

### Copyright
This is sourced from `.pricing_and_distribution.copyright` in the metadata file.

Note that the string provided **must** contain the current year.

### Primary Category
This is sourced from `.ios_app_categorization.categorization_of_app.category` in the metadata file.

This is the main category of the app.

### Primary First Sub Category
This is currently unused.

### Primary Second Sub Category
This is currently unused.

### Secondary Category
This is currently unused.

### Secondary First Sub Category
This is currently unused.

### Secondary Second Sub Category
This is currently unused.

### Name
This is sourced from `.app_name` in the metadata file.

### Title
This is sourced from `.ios_app_categorization.product_details.title` in the metadata file.

### Privacy URL
This is sourced from `.ios_app_categorization.tnc_and_privacy_policy.privacy_policy_url` in the metadata file.

Note that this must be a valid URL including the scheme, e.g. `https://www.example.com`

### Apple TV Privacy Policy
This is currently unused.

### Full Description
This is sourced from `.ios_app_categorization.product_details.full_description` in the metadata file.

### Keywords
This is sourced from `.keywords` in the metadata file. Note that this is expected to be a string containing tags and not a list.

### Release Notes
This is currently unused.

### Support URL
This is sourced from `.page_urls.support_url` in the metadata file.

### Promotional Text
This is sourced from `.android_app_categorization.product_details.promotional_text` in the metadata file.

### Review Information
Information given to Apple for review purposes, this is a point of contact that they can speak to.

#### First Name
First name of the contact. Sourced from `.contact_details.first_name` in the metadata file.

#### Last Name
Last name of the contact. Sourced from `.contact_details.last_name` in the metadata file.

#### Phone Number
Phone number of the contact. Sourced from `.contact_details.phone` in the metadata file.

#### Email Address
Email address for the contact. Sourced from `.contact_details.email` in the metadata file.

#### Demo User
This is currently unused.

#### Demo Password
This is currently unused.

#### Notes
This is currently unused.
