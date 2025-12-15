fetch("../Nav-Bar.html")

  .then(response => response.text())
  .then(html => {
    document.getElementById("nav-placeholder").innerHTML = html;
    
    // helper to run even if DOMContentLoaded already fired
    const runWhenReady = (fn) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
      } else {
        fn();
      }
    };

    // Mobile Menu and Search Toggle
    runWhenReady(function() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      const searchContainer = document.querySelector('.search-container');
      const searchButton = document.querySelector('.search-button');
    
      // Toggle mobile menu
      menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');
      });
    
      // Toggle search on mobile
      searchButton?.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          searchContainer.classList.toggle('active');
        }
      });
    
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menuToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
          navLinks?.classList.remove('show');
          menuToggle?.classList.remove('active');
        }
      });
    
      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          navLinks?.classList.remove('show');
          menuToggle?.classList.remove('active');
          searchContainer?.classList.remove('active');
        }
      });
    });
    
    // Search Bar
    
    runWhenReady(function() {
      const searchButton = document.querySelector('.search-button');
      const searchInput = document.querySelector('.search-box input');
      const searchBox = document.querySelector('.search-box');
      const searchDropdown = document.querySelector('.search-results-dropdown');
      
      // Initialize products in localStorage if they don't exist
      function initializeProducts() {
        if (!localStorage.getItem('menProducts')) {
          const menProducts = [
            {"id":1,"name":"Titan Neo Splash Quartz","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw1888ad40/images/Titan/Catalog/1805QM01_1.jpg?sw=360&sh=360","price":"₹8,495","category":"Men Watch","brand":"TITAN","rating":"4.3"},
            {"id":2,"name":"Fossil Leather Analog Beige","image":"https://m.media-amazon.com/images/I/71+YIwf2HjL._SX679_.jpg","price":"₹11,995","category":"Men Watch","brand":"FOSSIL","rating":"4.7"},
            {"id":3,"name":"Sonata Quartz Multifunction","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw773e1744/images/Sonata/Catalog/77145YM01_1.jpg?sw=600&sh=600","price":"₹3,895","category":"Men Watch","brand":"SONATA","rating":"4.7"},
            {"id":4,"name":"Police Quartz","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwc6e70e85/images/Helios/Catalog/PLPEWJQ2204707_1.jpg?sw=600&sh=600","price":"₹9,300","category":"Men Watch","brand":"POLICE","rating":"4.6"},
            {"id":5,"name":"Titan Neo Economy Quartz","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw16d57974/images/Titan/Catalog/1802QL03_1.jpg?sw=360&sh=360","price":"₹3,845","category":"Men Watch","brand":"TITAN","rating":"5.0"},
            {"id":6,"name":"Fossil Analog Black","image":"https://m.media-amazon.com/images/I/71EkA-XaZyL._SX522_.jpg","price":"₹14,995","category":"Men Watch","brand":"FOSSIL","rating":"4.5"},
            {"id":7,"name":"Titan Crest 2.0","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw99bb1658/images/Titan/Catalog/90205AP03_1.jpg?sw=600&sh=600","price":"₹6,499","category":"Men Watch","brand":"TITAN","rating":"5.0"},
            {"id":8,"name":"Fossil Flynn Smoke Watch","image":"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRsEvJm9Snims-wQTKof7HAlJ68QwoPLAd59dLG0AleKCc0hWHYa3aUP5AXREsquQUu-J90sNvIuIXABI3q-Inh6U5m28JQSauKFtZlgaqMGMCA09j-GclO","price":"₹4,999","category":"Men Watch","brand":"FOSSIL","rating":"4.7"},
            {"id":9,"name":"Sonata Poze Quartz","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwd52ab9f0/images/Sonata/Catalog/SP70021NL01W_1.jpg?sw=600&sh=600","price":"₹1,005","category":"Men Watch","brand":"SONATA","rating":"4.0"},
            {"id":10,"name":"Police Quartz Multifunction Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwdf9f6d84/images/Helios/Catalog/PLPEWJQ0004540_1.jpg?sw=600&sh=600","price":"₹4,799","category":"Men Watch","brand":"POLICE","rating":"5.0"},
            {"id":11,"name":"Titan Slim Quartz Multifunction","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwfefaa8d1/images/Titan/Catalog/1877SL01_1.jpg?sw=600&sh=600","price":"₹5,995","category":"Men Watch","brand":"TITAN","rating":"4.5"},
            {"id":12,"name":"Fossil Men Bannon Watch Nykaa","image":"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR8sMEi9iJCa4juGjBR1Ml0cJaYhnPDlYwxIN5Vv4KSZgxrOBNnDv5tJvME_UYpoUaUYXmduMSAxEkJ1FLkBJbp5voOAI4L4h_DqaYSkmNHnlLcNa8VBVIB3Q","price":"₹8,999","category":"Men Watch","brand":"FOSSIL","rating":"4.8"},
            {"id":13,"name":"Titan Phoenix Skeletal","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwe19e8a28/images/Titan/Catalog/90223WL01_2.jpg?sw=600&sh=600","price":"₹17,995","category":"Men Watch","brand":"TITAN","rating":"5.0"},
            {"id":14,"name":"Men Fossil Decker Black","image":"https://rukminim2.flixcart.com/image/1200/1200/xif0q/watch/j/v/x/-original-imagphkzyh6jc9ag.jpeg","price":"₹4,499","category":"Men Watch","brand":"FOSSIL","rating":"4.7"},
            {"id":15,"name":"Sonata Unveil Quartz Multifunction","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw116df811/images/Sonata/Catalog/7140SM03_1.jpg?sw=600&sh=600","price":"₹1,559","category":"Men Watch","brand":"SONATA","rating":"4.2"},
            {"id":16,"name":"Police Men's Skeleton","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw3f71a14a/images/Helios/Catalog/PLPEWJR0005906_1.jpg?sw=600&sh=600","price":"₹7,995","category":"Men Watch","brand":"POLICE","rating":"4.0"},
            {"id":17,"name":"Titan Octane Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwc07c110a/images/Titan/Catalog/90086KM05_1.jpg?sw=600&sh=600","price":"₹12,765","category":"Men Watch","brand":"TITAN","rating":"4.4"},
            {"id":18,"name":"Fossil Men Flynn Watch Nykaa","image":"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSr9K-fOVL7bDJtWdyCjglJnxlbWKch-lKTcCgYyNJpsxGrgCxr0dfwU8Sa2EtTo3foDThCeTKN9FhjL6GSCjyVFs-hzuV0qbpBznJ27koHCK0jyxbUCkmW","price":"₹11,822","category":"Men Watch","brand":"FOSSIL","rating":"4.5"}
          ];
          localStorage.setItem('menProducts', JSON.stringify(menProducts));
        }

        if (!localStorage.getItem('womenProducts')) {
          const womenProducts = [
            {"id":19,"name":"Lagan Watch","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6c9df22a/images/Titan/Catalog/2656WM01_1.jpg?sw=360&sh=360","price":"₹2985","category":"Women Watch","brand":"TITAN","rating":"4.3"},
            {"id":20,"name":"Fossil Analog Silver","image":"https://m.media-amazon.com/images/I/710gUAY1HZL._SX679_.jpg","price":"₹9,495","category":"Women Watch","brand":"FOSSIL","rating":"4.7"},
            {"id":21,"name":"Dot to Dot Green Dial","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6eca577d/images/Sonata/Catalog/87038PL03W_1.jpg?sw=360&sh=360","price":"₹1599","category":"Women Watch","brand":"SONATA","rating":"4.2"},
            {"id":22,"name":"Raga Viva Brown","image":"https://m.media-amazon.com/images/I/51zlSuKt3KL._SX522_.jpg","price":"₹5,695","category":"Women Watch","brand":"RAGA","rating":"4.6"},
            {"id":23,"name":"Titan Rose Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwf87788bb/images/Titan/Catalog/2656WL01_1.jpg?sw=360&sh=360","price":"₹1995","category":"Women Watch","brand":"TITAN","rating":"4.3"},
            {"id":24,"name":"Fossil Analog Gold Dial","image":"https://m.media-amazon.com/images/I/813k7oMXvEL._SX679_.jpg","price":"₹11,995","category":"Women Watch","brand":"FOSSIL","rating":"4.8"},
            {"id":25,"name":"Elegant Titan Watch","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwdd79bad5/images/Titan/Catalog/90110QM02_1.jpg?sw=360&sh=360","price":"₹9495","category":"Women Watch","brand":"TITAN","rating":"5.0"},
            {"id":26,"name":"Fossil Analog Silver Dial","image":"https://m.media-amazon.com/images/I/71is1eWyLRL._SX679_.jpg","price":"₹13,495","category":"Women Watch","brand":"FOSSIL","rating":"4.7"},
            {"id":27,"name":"Sonata Linnea Rose Gold Dial","image":"https://m.media-amazon.com/images/I/81Ow6AbYx8L._SX679_.jpg","price":"₹1,999","category":"Women Watch","brand":"SONATA","rating":"4.2"},
            {"id":28,"name":"Raga Memoirs Quartz ","image":"https://m.media-amazon.com/images/I/71F6kGULmAL._SX679_.jpg","price":"₹13,348","category":"Women Watch","brand":"RAGA","rating":"5.0"},
            {"id":29,"name":"Raga Women's Charm","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw5487e70b/images/Titan/Catalog/2606WM08_1.jpg?sw=360&sh=360","price":"₹8365","category":"Women Watch","brand":"TITAN","rating":"4.5"},
            {"id":30,"name":"Fossil Analog Silver Dial","image":"https://m.media-amazon.com/images/I/716taktWHaL._SX679_.jpg","price":"₹11,447","category":"Women Watch","brand":"FOSSIL","rating":"4.8"},
            {"id":31,"name":"Titan Purple Glam","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwb7560c04/images/Titan/Catalog/2634WM05_1.jpg?sw=360&sh=360","price":"₹6,345","category":"Women Watch","brand":"TITAN","rating":"4.5"},
            {"id":32,"name":"Fossil Stainless Steel Analog Green","image":"https://m.media-amazon.com/images/I/71l9tkkKzQL._SX679_.jpg","price":"₹2,995","category":"Women Watch","brand":"FOSSIL","rating":"4.7"},
            {"id":33,"name":"Sonata Polyurethane Black Dial","image":"https://m.media-amazon.com/images/I/61iMh28jCCL._SX679_.jpg","price":"₹694","category":"Women Watch","brand":"SONATA","rating":"4.2"},
            {"id":34,"name":"Raga Showstopper 2.0 Quartz Green","image":"https://m.media-amazon.com/images/I/71WXkGpIjaL._SX522_.jpg","price":"₹5,343","category":"Women Watch","brand":"RAGA","rating":"4.6"},
            {"id":35,"name":"Raga Showstopper","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw55ffe55f/images/Titan/Catalog/95272WM01_1.jpg?sw=360&sh=360","price":"₹3,395","category":"Women Watch","brand":"TITAN","rating":"4.4"},
            {"id":36,"name":"Fossil Analog Gold Dial","image":"https://m.media-amazon.com/images/I/41MxO-0RAxL._SX300_SY300_QL70_FMwebp_.jpg","price":"₹13,495","category":"Women Watch","brand":"FOSSIL","rating":"5.0"}
          ];
          localStorage.setItem('womenProducts', JSON.stringify(womenProducts));
        }

        if (!localStorage.getItem('smartProducts')) {
          const smartProducts = [
            {"id":37,"name":"Titan Traveller","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw0bf22148/images/Titan/Catalog/90166AP04_1.jpg?sw=600&sh=600","price":"₹5,999","category":"Men Watch","brand":"TITAN","rating":"3.7"},
            {"id":38,"name":"Fossil FTW4071V Gen","image":"https://m.media-amazon.com/images/I/51Z85so76cL.jpg","price":"₹9,598","category":"Men Watch","brand":"FOSSIL","rating":"3.0"},
            {"id":39,"name":"Noise Twist","image":"https://m.media-amazon.com/images/I/41g7CijFWDL._SX300_SY300_QL70_FMwebp_.jpg","price":"₹1499","category":"Men Watch","brand":"NOISE","rating":"4.0"},
            {"id":40,"name":"Fastrack Radiant FX1","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw0fc5f33a/images/Fastrack/Catalog/38123QM01_1.jpg?sw=600&sh=600","price":"₹3,999","category":"Men Watch","brand":"FASTRACK","rating":"4.4"},
            {"id":41,"name":"Titan Zeal","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw2812dfdc/images/Titan/Catalog/90196AM02_1.jpg?sw=600&sh=600","price":"₹3,999","category":"Men Watch","brand":"TITAN","rating":"4.1"},
            {"id":42,"name":"Fastrack Astor FR2 Pro","image":"https://m.media-amazon.com/images/I/71rjlGEi+1L._SX522_.jpg","price":"₹2,999","category":"Men Watch","brand":"FASTRACK","rating":"4"},
            {"id":43,"name":"Titan Maestro Premium","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwd2f2804d/images/Titan/Catalog/90208NM01_1.jpg?sw=600&sh=600","price":"₹12,495","category":"Men Watch","brand":"TITAN","rating":"3.6"},
            {"id":44,"name":"Fossil Gen 5E","image":"https://img.tatacliq.com/images/i7/1316Wx1468H/MP000000010475929_1316Wx1468H_202109012356401.jpeg","price":"₹18,795","category":"Women Watch","brand":"FOSSIL","rating":"4.0"},
            {"id":45,"name":"Fastrack Limitless Glide","image":"https://m.media-amazon.com/images/I/41tps1-sn4L._SX300_SY300_QL70_FMwebp_.jpg","price":"₹1,863","category":"Men Watch","brand":"FASTRACK","rating":"4.0"},
            {"id":46,"name":"Titan Maestro Premium","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw7d6ec13e/images/Titan/Catalog/90208KM02_1.jpg?sw=600&sh=600","price":"₹12,999","category":"Men Watch","brand":"TITAN","rating":"3.7"},
            {"id":47,"name":"Fastrack Xtreme Pro","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw128e7d24/images/Fastrack/Catalog/38111PP02_1.jpg?sw=600&sh=600","price":"₹2,999","category":"Men Watch","brand":"FASTRACK","rating":"4.2"},
            {"id":48,"name":"Fossil FTW1186 Barstow","image":"https://img.tatacliq.com/images/i7/1316Wx1468H/MP000000011158572_1316Wx1468H_202111132347431.jpeg","price":"₹13,495","category":"Men Watch","brand":"FOSSIL","rating":"4.8"},
            {"id":49,"name":"Titan Celestor Advanced","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw7a2ea575/images/Titan/Catalog/90206AP01_1.jpg?sw=600&sh=600","price":"₹9,995","category":"Men Watch","brand":"TITAN","rating":"3.9"},
            {"id":50,"name":"Fossil Men Blue ","image":"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQm3FeIukME54s5Go_XG_pz83nFufv_WfFZ4fmOHBstOJYPdXtQOLmRTPL4EDLBddg_LrroFAkL2OQ2Hd-CHV7T7BW31WynSgrSJe0qicwDp-hZPZMU1VeyIA","price":"₹15,495","category":"Men Watch","brand":"FOSSIL","rating":"4.7"},
            {"id":51,"name":"NoiseFit Halo","image":"https://m.media-amazon.com/images/I/71aTghUQfqL._SX679_.jpg","price":"₹2,999","category":"Men Watch","brand":"NOISE","rating":"4.2"},
            {"id":52,"name":"Fastrack Radiant FX4","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw56c2fc35/images/Fastrack/Catalog/38158NM01_1.jpg?sw=600&sh=600","price":"₹5,495","category":"Men Watch","brand":"FASTRACK","rating":"4.6"},
            {"id":53,"name":"Titan Heritage Premium","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwccf4d845/images/Titan/Catalog/90207QM01_1.jpg?sw=600&sh=600","price":"₹3,395","category":"Men Watch","brand":"TITAN","rating":"5"},
            {"id":54,"name":"Noise Twist Round","image":"https://m.media-amazon.com/images/I/61-vRq2ulOL._SX679_.jpg","price":"₹1,399","category":"Men Watch","brand":"NOISE","rating":"4.0"}
          ];
          localStorage.setItem('smartProducts', JSON.stringify(smartProducts));
        }

        if (!localStorage.getItem('premiumProducts')) {
          const premiumProducts = [
            {"id":55,"name":"Titan Edge Slim Stainless Steel","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwb3422dcf/images/Titan/Catalog/1843QM02_1.jpg?sw=600&sh=600","price":"₹20,795","category":"Men Watch","brand":"EDGE","rating":"4.3"},
            {"id":56,"name":"Xylys Shimmer Swiss Analog Steel","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw4e1fb6e5/images/Xylys/Catalog/9766WD02M_5.jpg?sw=600&sh=600","price":"₹31,500","category":"Women Watch","brand":"XYLYS","rating":"5.0"},
            {"id":57,"name":"Xylys Quartz Chronograph Rose Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw7571ed8a/images/Xylys/Catalog/45025WM01E_1.jpg?sw=600&sh=600","price":"₹ 52,500","category":"Women Watch","brand":"XYLYS","rating":"4.2"},
            {"id":58,"name":"Xylys Swiss Chronograph Stainless Steel","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw74bde228/images/Xylys/Catalog/9295DM05_1.jpg?sw=600&sh=600","price":"₹83,500","category":"Men Watch","brand":"XYLYS","rating":"4.6"},
            {"id":596,"name":"Titan Edge Ceramic Quartz in Atlantic Blue","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw2c9756c2/images/Titan/Catalog/2653QC03_1.jpg?sw=600&sh=600","price":"₹24,995","category":"Women Watch","brand":"TITAN","rating":"4.7"},
            {"id":606,"name":"Xylys Velocita Swiss Chronograph","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw4383bdc2/images/Xylys/Catalog/40057NM01E_1.jpg?sw=600&sh=600","price":"₹36,500","category":"Men Watch","brand":"XYLYS","rating":"5.0"},
            {"id":61,"name":"Titan Ceramic Fusion","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwe6fbd79a/images/Titan/Catalog/90175KD02_2.jpg?sw=600&sh=600","price":"₹29,145","category":"Men Watch","brand":"TITAN","rating":"4.4"},
            {"id":62,"name":"Xylys Quartz Chronograph Rose Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw7571ed8a/images/Xylys/Catalog/45025WM01E_1.jpg?sw=600&sh=600","price":"₹42,500","category":"Women Watch","brand":"XYLYS","rating":"4.7"},
            {"id":63,"name":"Titan Nebula Lustre 18k Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwc8f09b8a/images/Titan/Catalog/5064DL01_2.jpg?sw=600&sh=600","price":"₹136,000","category":"Men Watch","brand":"NEBULA","rating":"4.2"},
            {"id":64,"name":"Titan Edge Squircle Quartz Analog White","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw615124d2/images/Titan/Catalog/2757QC01_1.jpg?sw=600&sh=600","price":"₹37,995","category":"Women Watch","brand":"EDGE","rating":"5.0"},
            {"id":65,"name":"Titan Nebula Lustre 18k Gold ","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw8aa8552a/images/Titan/Catalog/5572DL01_1.jpg?sw=600&sh=600","price":"₹101,200","category":"Women Watch","brand":"NEBULA","rating":"5.0"},
            {"id":66,"name":"Titan Edge Fusion Quartz Analog Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwfc3c6b8e/images/Titan/Catalog/1878KD01_1.jpg?sw=600&sh=600","price":"₹26,995","category":"Women Watch","brand":"FOSSIL","rating":"4.8"},
            {"id":67,"name":"Titan Nebula Vintage 18k Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwe5285c84/images/Titan/Catalog/1921DM02_1.jpg?sw=600&sh=600","price":"₹4,35,200","category":"Women Watch","brand":"NEBULA","rating":"4.5"},
            {"id":68,"name":"Titan Edge Squircle Quartz in Arctic White","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw5b1413e5/images/Titan/Catalog/1841QC03_1.jpg?sw=600&sh=600","price":"₹43,995","category":"Unisex Watch","brand":"EDGE","rating":"4.2"},
            {"id":69,"name":"Titan Nebula Vintage 18k Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw63114090/images/Titan/Catalog/5033DM02_1.jpg?sw=600&sh=600","price":"₹600,000","category":"Men Watch","brand":"NEBULA","rating":"5.0"},
            {"id":70,"name":"Titan Edge Ceramic Quartz","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw82bf5608/images/Titan/Catalog/1696QC04_1.jpg?sw=600&sh=600","price":"₹33,995","category":"Men Watch","brand":"EDGE","rating":"4.9"},
            {"id":71,"name":"Xylys Quartz Analog Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwf1ad553d/images/Xylys/Catalog/40065KL01E_2.jpg?sw=600&sh=600","price":"₹39,900","category":"Men Watch","brand":"XYLYS","rating":"4.4"},
            {"id":72,"name":"Titan Vintage 18k Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw168a5b4a/images/Titan/Catalog/5069DM01_1.jpg?sw=600&sh=600","price":"₹429,250","category":"Women Watch","brand":"NEBULA","rating":"5.0"}
          ];
          localStorage.setItem('premiumProducts', JSON.stringify(premiumProducts));
        }

        if (!localStorage.getItem('internationalProducts')) {
          const internationalProducts = [
            {"id":73,"name":"Tommy Hilfiger Quartz Multifunction Silver","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw9ddad46e/images/Helios/Catalog/TH1791726_1.jpg?sw=600&sh=600","price":"₹17,999","category":"Men Watch","brand":"TOMMY HILFIGER","rating":"4.3"},
            {"id":74,"name":"Police Multifunction Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw26ea9844/images/Helios/Catalog/PLPEWGQ0056801_1.jpg?sw=600&sh=600","price":"₹23,149","category":"Men Watch","brand":"POLICE","rating":"5.0"},
            {"id":75,"name":"Kenneth Cole Automatic White","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwcb701abb/images/Helios/Catalog/KCWGX0063802MN_1.jpg?sw=600&sh=600","price":"₹21,799","category":"Men Watch","brand":"KENNETH COLE","rating":"4.2"},
            {"id":76,"name":"Tommy Hilfiger Automatic Green","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwfd18b563/images/Helios/Catalog/TH1792155W_1.jpg?sw=600&sh=600","price":"₹25,500","category":"Men Watch","brand":"TOMMY HILFIGER","rating":"4.6"},
            {"id":77,"name":"Anne Klein Quartz Analog Blue ","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwa26c27bc/images/Helios/Catalog/AK1018RGNV_1.jpg?sw=600&sh=600","price":"₹13,200","category":"Women Watch","brand":"ANNE KLEIN","rating":"4.3"},
            {"id":78,"name":"Kenneth Cole Quartz Analog Rose Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwddcc43d4/images/Helios/Catalog/KCWLG0026802LD_1.jpg?sw=600&sh=600","price":"₹13,499","category":"Women Watch","brand":"KENNETH COLE","rating":"4.8"},
            {"id":79,"name":"Police Multifunction Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwdb387da0/images/Helios/Catalog/PLPEWGF0054503_1.jpg?sw=600&sh=600","price":"₹26,695","category":"Men Watch","brand":"POLICE","rating":"5.0"},
            {"id":80,"name":"Tommy Hilfiger Quartz Analog Green","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw071eef5d/images/Helios/Catalog/TH1782553_1.jpg?sw=600&sh=600","price":"₹10,500","category":"Women Watch","brand":"TOMMY HILFIGER","rating":"4.7"},
            {"id":81,"name":"Kenneth Cole Automatic Rose Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwbb2338ec/images/Helios/Catalog/KCWLL2235702LD_1.jpg?sw=600&sh=600","price":"₹16,999","category":"Women Watch","brand":"KENNETH COLE","rating":"5.0"},
            {"id":82,"name":"Tommy Hilfiger Analog Rose Gold","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw0f359168/images/Helios/Catalog/TH1782761_1.jpg?sw=600&sh=600","price":"₹16,999","category":"Women Watch","brand":"TOMMY HILFIGER","rating":"5.0"},
            {"id":83,"name":"Police Multifunction Green","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw43e42f2b/images/Helios/Catalog/PLPEWJF2227001_1.jpg?sw=600&sh=600","price":"₹14,495","category":"Men Watch","brand":"POLICE","rating":"3.0"},
            {"id":84,"name":"Anne Klein Quartz Analog Mother Of Pearl","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw3240922a/images/Helios/Catalog/AK5112RGBH_1.jpg?sw=600&sh=600","price":"₹12,500","category":"Women Watch","brand":"ANNE KLEIN","rating":"4.8"},
            {"id":85,"name":"Kenneth Cole Quartz Analog Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwbccd95e3/images/Helios/Catalog/KCWGM0020801MN_1.jpg?sw=600&sh=600","price":"₹12,999","category":"men Watch","brand":"KENNETH COLE","rating":"4.5"},
            {"id":86,"name":"Tommy Hilfiger Quartz Analog Blue","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw9a595bd0/images/Helios/Catalog/TH1791560_1.jpg?sw=600&sh=600","price":"₹18,499","category":"Men Watch","brand":"TOMMY HILFIGER","rating":"5.0"},
            {"id":87,"name":"Anne Klein Quartz Analog Black","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw22a8ecb8/images/Helios/Catalog/AKB3620BKST_1.jpg?sw=600&sh=600","price":"₹11,499","category":"Women Watch","brand":"ANNE KLEIN","rating":"4.2"},
            {"id":88,"name":"Kenneth Cole Quartz Chronograph Grey","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw1287f7a7/images/Helios/Catalog/KCWGC0016102MN_1.jpg?sw=600&sh=600","price":"₹17,499","category":"Men Watch","brand":"KENNETH COLE","rating":"4.4"},
            {"id":89,"name":"Anne Klein Quartz Analog Purple","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwb721c967/images/Helios/Catalog/AK4018PRRG_1.jpg?sw=600&sh=600","price":"₹8,750","category":"Women Watch","brand":"ANNE KLEIN","rating":"4.6"},
            {"id":18,"name":"Police Quartz Analog Grey","image":"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw89a444e0/images/Helios/Catalog/PLPEWJA2110101_1.jpg?sw=600&sh=600","price":"₹14,750","category":"Men Watch","brand":"POLICE","rating":"5.0"}
          ];
          localStorage.setItem('internationalProducts', JSON.stringify(internationalProducts));
        }
      }
    
      // Initialize products when page loads
      initializeProducts();
      
      // Get all products from localStorage
      function getAllProducts() {
        const menProducts = JSON.parse(localStorage.getItem('menProducts') || '[]');
        const womenProducts = JSON.parse(localStorage.getItem('womenProducts') || '[]');
        const smartProducts = JSON.parse(localStorage.getItem('smartProducts') || '[]');
        const premiumProducts = JSON.parse(localStorage.getItem('premiumProducts') || '[]');
        const internationalProducts = JSON.parse(localStorage.getItem('internationalProducts') || '[]');
    
        console.log('Men Products:', menProducts);
        console.log('Women Products:', womenProducts);
        console.log('Smart Products:', smartProducts);
        console.log('Premium Products:', premiumProducts);
        console.log('International Products:', internationalProducts);
    
        const allProducts = [
          ...menProducts,
          ...womenProducts,
          ...smartProducts,
          ...premiumProducts,
          ...internationalProducts
        ];
    
        console.log('All Products:', allProducts);
        return allProducts;
      }
    
      // Search function
      function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
          // Add loading state
          searchButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
          searchButton.disabled = true;
          
          // Store search term in localStorage
          localStorage.setItem('searchTerm', searchTerm);
          
          // Redirect to search results page
          window.location.href = 'search-results.html';
        } else {
          // Visual feedback for empty search
          searchBox.classList.add('empty-search');
          setTimeout(() => {
            searchBox.classList.remove('empty-search');
          }, 500);
        }
      }
    
      // Show search results in dropdown
      function showSearchResults(searchTerm) {
        if (!searchTerm) {
          searchDropdown.classList.remove('active');
          return;
        }
    
        const allProducts = getAllProducts();
        const filteredProducts = allProducts.filter(product => {
          const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
          const brandMatch = product.brand.toLowerCase().includes(searchTerm.toLowerCase());
          return nameMatch || brandMatch;
        });
    
        searchDropdown.innerHTML = '';
    
        if (filteredProducts.length === 0) {
          searchDropdown.innerHTML = '<div class="no-results">No products found</div>';
        } else {
          filteredProducts.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <div class="item-details">
                <div class="item-name">${product.name}</div>
                <div class="item-price">${product.price}</div>
                <div class="item-brand">${product.brand}</div>
              </div>
            `;
            
            resultItem.addEventListener('click', () => {
              // Store the selected product in localStorage
              localStorage.setItem('selectedProduct', JSON.stringify(product));
              
              // Determine the correct product detail page based on category
              let productPage = 'product.html'; // default page
              
              if (product.category.toLowerCase().includes('men')) {
                productPage = 'men/product.html';
              } else if (product.category.toLowerCase().includes('women')) {
                productPage = 'women/product2.html';
              } else if (product.category.toLowerCase().includes('smart')) {
                productPage = 'smart-watch/product3.html';
              } else if (product.category.toLowerCase().includes('premium')) {
                productPage = 'premium watch/product4.html';
              } else if (product.category.toLowerCase().includes('international')) {
                productPage = 'internation brand/product5.html';
              }
              
              // Redirect to the appropriate product detail page
              window.location.href = productPage;
            });
            
            searchDropdown.appendChild(resultItem);
          });
        }
    
        searchDropdown.classList.add('active');
      }
    
      // Add click event to button
      searchButton.addEventListener('click', performSearch);
      
      // Add input event to show dropdown results
      searchInput.addEventListener('input', function() {
        searchBox.classList.remove('empty-search');
        const searchTerm = this.value.trim();
        console.log('Input Event - Search Term:', searchTerm);
        showSearchResults(searchTerm);
      });
      
      // Add enter key event to input
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target)) {
          searchDropdown.classList.remove('active');
        }
      });
    
      // Add focus styles
      searchInput.addEventListener('focus', function() {
        searchBox.classList.add('focused');
        if (this.value.trim()) {
          showSearchResults(this.value.trim());
        }
      });
      
      searchInput.addEventListener('blur', function() {
        searchBox.classList.remove('focused');
      });
    });
    
    // // // // // // // // // // // // // // // // // // // // // // // // // // // 
    
    runWhenReady(() => {
      // Menu toggle for mobile
      const menuToggle = document.querySelector(".menu-toggle");
      const navLinks = document.querySelector(".nav-links");
    
      menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    
      // For mobile: make nav items expandable
      const navItems = document.querySelectorAll('.nav-item');
    
      navItems.forEach(item => {
        const link = item.querySelector('a');
    
        // Mobile only click behavior for mega menu
        if (window.innerWidth <= 768) {
          link.addEventListener('click', (e) => {
            // Only prevent default if it has mega menu
            if (item.querySelector('.mega-menu')) {
              e.preventDefault();
    
              // Close all other open menus
              navItems.forEach(otherItem => {
                if (otherItem !== item) {
                  otherItem.classList.remove('active');
                }
              });
    
              // Toggle current menu
              item.classList.toggle('active');
            }
          });
        }
      });
    
      // Highlight active nav and hide home on homepage
      const setActiveNav = () => {
        const path = window.location.pathname.toLowerCase();
        let section = '';

        if (path.endsWith('/') || path.endsWith('/index.html') || path === '/index.html') {
          section = 'home';
        } else if (path.includes('/men/')) {
          section = 'men';
        } else if (path.includes('/women/')) {
          section = 'women';
        } else if (path.includes('/smart-watch/')) {
          section = 'smart';
        } else if (path.includes('/premium%20watch/') || path.includes('/premium watch/')) {
          section = 'premium';
        } else if (path.includes('/internation%20brand/') || path.includes('/internation brand/')) {
          section = 'international';
        }

        const navItemsAll = document.querySelectorAll('.nav-item');
        navItemsAll.forEach(item => item.classList.remove('active'));

        const homeItem = document.querySelector('.nav-item[data-section="home"]');
        if (homeItem) {
          if (section === 'home') {
            homeItem.style.display = 'none';
          } else {
            homeItem.style.display = '';
          }
        }

        if (section) {
          const activeLink = document.querySelector(`a[data-section="${section}"]`);
          activeLink?.parentElement?.classList.add('active');
        }
      };

      setActiveNav();

      // Reset menu state on window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          navLinks.classList.remove('show');
          navItems.forEach(item => item.classList.remove('active'));
        }
      });
    
      // Login and Profile Management
      const accountBtn = document.querySelector('.account-btn');
      const loginPopup = document.getElementById('loginPopup');
      const userProfilePopup = document.getElementById('userProfilePopup');
      const closeLogin = document.getElementById('closeLogin');
      const closeProfile = document.getElementById('closeProfile');
      const showRegister = document.getElementById('showRegister');
      const showLogin = document.getElementById('showLogin');
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      const logoutBtn = document.getElementById('logoutBtn');
    
      // Check if user is logged in
      const checkLoginStatus = () => {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          updateLoggedInState(user);
        } else {
          updateLoggedOutState();
        }
      };
    
      // Update UI for logged in state
      const updateLoggedInState = (user) => {
        accountBtn.innerHTML = `
          <i class="fa-regular fa-user"></i>
          <span>${user.name}</span>
        `;
        accountBtn.onclick = showUserProfile;
      };
    
      // Update UI for logged out state
      const updateLoggedOutState = () => {
        accountBtn.innerHTML = `
          <i class="fa-regular fa-user"></i>
          <span>Account</span>
        `;
        accountBtn.onclick = showLoginPopup;
      };
    
      // Show login popup
      const showLoginPopup = () => {
        loginPopup.style.display = 'flex';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
      };
    
      // Show user profile
      const showUserProfile = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          document.getElementById('profileName').textContent = userData.name;
          document.getElementById('profileEmail').textContent = userData.email;
          document.getElementById('profileMobile').textContent = userData.mobile;
          userProfilePopup.style.display = 'flex';
        }
      };
    
      // Handle login form submission
      loginForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
    
        // Get stored user data
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if (userData && userData.email === email && userData.password === password) {
          loginPopup.style.display = 'none';
          updateLoggedInState(userData);
          showMessage('Login successful!', false);
        } else {
          showMessage('Invalid email or password');
        }
      });
    
      // Handle register form submission
      registerForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[placeholder="Full Name"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const mobile = this.querySelector('input[placeholder="Mobile Number"]').value;
        const password = this.querySelector('input[placeholder="Create Password"]').value;
        const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value;
    
        if (password !== confirmPassword) {
          showMessage('Passwords do not match');
          return;
        }
    
        // Save user data
        const userData = {
          name,
          email,
          mobile,
          password
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    
        loginPopup.style.display = 'none';
        updateLoggedInState(userData);
        showMessage('Registration successful!', false);
      });
    
      // Handle logout
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userData');
        updateLoggedOutState();
        userProfilePopup.style.display = 'none';
        showMessage('Logged out successfully', false);
      });
    
      // Close buttons
      closeLogin.addEventListener('click', () => {
        loginPopup.style.display = 'none';
      });
    
      closeProfile.addEventListener('click', () => {
        userProfilePopup.style.display = 'none';
      });
    
      // Toggle between login and register forms
      showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
      });
    
      showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
      });
    
      // Show message function
      const showMessage = (message, isError = true) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isError ? 'error' : 'success'}`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
    
        setTimeout(() => {
          messageDiv.remove();
        }, 3000);
      };
    
      // Check login status on page load
      checkLoginStatus();
    });
  });



  ///////////////////
fetch("../footer.html")

  .then(response => response.text())
  .then(html => {
    document.getElementById("footer-placeholder").innerHTML = html;   })


// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Slider
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;
let isAnimating = false;
let slideInterval;
const SLIDE_DURATION = 3000; // 3 seconds in milliseconds

function showSlide(index, direction = 'right') {
  if (isAnimating) return;
  isAnimating = true;

  // Remove all animation classes
  slides.forEach(slide => {
    slide.classList.remove('active', 'slide-in-right', 'slide-in-left');
  });

  // Add appropriate animation class based on direction
  slides[index].classList.add('active', `slide-in-${direction}`);

  // Reset animation flag after animation completes
  setTimeout(() => {
    isAnimating = false;
  }, 1000);
}

function nextSlide() {
  if (isAnimating) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide, 'right');
}

function prevSlide() {
  if (isAnimating) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide, 'left');
}

function startAutoSlide() {
  // Clear any existing interval
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  // Start new interval with precise 3-second timing
  slideInterval = setInterval(() => {
    nextSlide();
  }, SLIDE_DURATION);
}

// Initialize slider
function initSlider() {
  showSlide(currentSlide);
  startAutoSlide();
}

// Pause auto-slide when hovering over the slider
const slider = document.querySelector('.slider');
slider?.addEventListener('mouseenter', () => {
  // clearInterval(slideInterval);
});

// Resume auto-slide when mouse leaves the slider
slider?.addEventListener('mouseleave', () => {
  startAutoSlide();
});

// Button event listeners
nextBtn?.addEventListener("click", () => {
  clearInterval(slideInterval);
  nextSlide();
  startAutoSlide();
});

prevBtn?.addEventListener("click", () => {
  clearInterval(slideInterval);
  prevSlide();
  startAutoSlide();
});

// Start the slider
initSlider();

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Mobile Nav Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Short Banner
const track = document.getElementById("carouselTrack");
const scrollAmount = 220;
let autoScrollInterval;

function scrollCarousel(direction) {
  if (direction === "left") {
    track.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  } else {
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}

// Automatic scrolling one-by-one
function startAutoCarousel() {
  autoScrollInterval = setInterval(() => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollCarousel("right");
    }
  }, 3000);
}
startAutoCarousel();



function scrollCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  const scrollAmount = track.offsetWidth / 2; // dynamic scroll
  if (direction === 'left') {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Footer
// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  // Show button when user scrolls down 300px
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Smooth scroll to top when button is clicked
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});