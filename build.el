;; emacs -Q --script build.el

(require 'package)
(setq package-user-dir (expand-file-name "./.packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("elpa" . "https://elpa.gnu.org/packages/")))

(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

(package-install 'htmlize)

(require 'ox-publish)

(setq org-html-validation-link nil
      org-confirm-babel-evaluate nil
      org-html-htmlize-output-type 'css
      org-html-head-include-scripts nil
      org-html-head-include-default-style nil
      org-html-head "<link rel=\"stylesheet\" href=\"styles/org.css\">") 

(setq org-publish-project-alist
      `(("home"
         :base-directory "."
         :publishing-directory "./public"
	 :exclude "README.org"

         :with-creator nil
         :with-author nil
         :with-date nil
         :with-toc nil
         :section-numbers nil
         :time-stamp-file nil

         :publishing-function org-html-publish-to-html)

        ("images"
         :base-directory "./images/"
         :base-extension "jpeg\\|jpg\\|gif\\|png"

         :publishing-directory "./public/images"
         :publishing-function org-publish-attachment)

	("fonts"
	 :recursive t

	 :base-extension any ;; cba
	 :base-directory "./fonts/"

	 :publishing-directory "./public/fonts"
	 :publishing-function org-publish-attachment)

        ("styles"
	 :recursive t

         :base-extension "css"
         :base-directory "./styles/"

         :publishing-directory "./public/styles"
         :publishing-function org-publish-attachment)

        ("website" :components ("home" "images" "fonts" "styles"))))

(org-publish-all t)
(message "Build complete")
