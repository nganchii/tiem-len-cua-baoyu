const PRODUCTS = {
  "Blue-rose": {
    name: "Thanh Xuân Vĩnh Cửu",
    price: 145000,
    img: "Sản phẩm/SP Hoa/Blue-rose (1).jpg",
    category: "Sản phẩm Hoa",
    desc: "Sắc xanh lam dịu mát hòa quyện cùng màu trắng tinh khôi tạo nên một tổng thể vô cùng dễ chịu và sang trọng. Màu xanh biểu trưng cho sự hy vọng và những điều bình yên, rất phù hợp để tặng bạn bè, đồng nghiệp hoặc tự thưởng cho bản thân.",
    material: "Len milk cotton"
  },
  "red-rose": {
    name: "Hồng Đơn Rực Rỡ",
    price: 155000,
    img: "Sản phẩm/SP Hoa/red-rose.jpg",
    category: "Sản phẩm Hoa",
    desc: "Điểm nhấn nằm ở kỹ thuật phối len loang màu tỉ mỉ, giúp bông hồng nở rộ một cách tự nhiên và có chiều sâu. Bọc trong lớp giấy hoa hồng vintage kiêu kỳ, đây chính là lời bày tỏ ngọt ngào và tinh tế nhất gửi đến người thương.",
    material: "Len milk cotton"
  },
  "rose": {
    name: "Giấc Mơ Kẹo Ngọt",
    price: 355000,
    img: "Sản phẩm/SP Hoa/rose(1).jpg",
    category: "Sản phẩm Hoa",
    desc: "Được xếp gọn gàng trong chiếc túi giấy thanh lịch, cụm hoa len với các tone màu hồng pastel và hồng dâu mang lại cảm giác dịu dàng, lãng mạn. Thích hợp làm quà tặng sinh nhật, ngày kỷ niệm hoặc decor bàn làm việc cực kỳ sang xịn mịn.",
    material: "Len milk cotton"
  },
  "sunflower": {
    name: "Vạt Nắng Ban Mai",
    price: 125000,
    img: "Sản phẩm/SP Hoa/Sunflower-bé (1).jpg",
    category: "Sản phẩm Hoa",
    desc: "Sự kết hợp hoàn hảo giữa sắc vàng rực rỡ của hướng dương và nét trong trẻo từ những bông cúc họa mi nhỏ xinh. Bó hoa mang theo lời chúc về một ngày mới tràn đầy năng lượng tích cực và may mắn. Món quà bền vững, không bao giờ tàn dành tặng người thương.",
    material: "Len milk cotton"
  },
  "sunflower-to": {
    name: "Rạng Rỡ Tương Lai",
    price: 369000,
    img: "Sản phẩm/SP Hoa/Sunflower-to (4).jpg",
    category: "Sản phẩm Hoa",
    desc: "Món quà độc quyền cho mùa kỷ yếu! Cặp đôi búp bê cử nhân má hồng siêu đáng yêu đứng cạnh bông hướng dương đại diện cho hoài bão và thành công. Giúp bạn lưu giữ cột mốc quan trọng nhất của thời học sinh, sinh viên thật trọn vẹn.",
    material: "Len milk cotton"
  },
  "tho-01": {
    name: "Thỏ Điệu",
    price: 45000,
    img: "Sản phẩm/SP Thú/bun (1).jpg",
    category: "Sản phẩm Thú",
    desc: "Nàng thỏ trắng tinh khôi diện chiếc váy xòe phối màu xanh - cam nổi bật, đầu cài chiếc nơ củ cải tinh nghịch. Từng mũi móc đều tăm tắp tạo nên form dáng đứng cực chuẩn, xứng đáng là hoa hậu trong bộ sưu tập thú bông decor tuần này.",
    material: "Len milk cotton"
  },
  "capy-01": {
    name: "Hạt Dẻ Đội Cam",
    price: 150000,
    img: "Sản phẩm/SP Thú/capy (1).jpg",
    category: "Sản phẩm Thú",
    desc: "Được móc từ dòng len nhung xù siêu mềm mại, tạo cảm giác êm ái tối đa khi ôm trong lòng bàn tay. Điểm nhấn là quả cam nhỏ xinh trên đầu, biến chú capypara trở thành món quà dễ thương không thể chối từ cho những người bạn yêu sự ấm áp.",
    material: "Len milk cotton"
  },
  "corn-01": {
    name: "Bé Bắp Nuông Chiều",
    price: 80000,
    img: "Sản phẩm/SP Thú/corn (1).jpg",
    category: "Sản phẩm Thú",
    desc: "Chút ngọt ngào từ đồng quê gói gọn trong em bắp ngô len phúng phính. Với lớp vỏ xanh bọc ngoài ôm lấy những hạt bắp vàng ruộm, kết hợp cùng chiếc má hồng hờn dỗi, em ấy sẵn sàng sưởi ấm mọi góc phòng học hay bàn làm việc của bạn.",
    material: "Len milk cotton"
  },
  "cup-01": {
    name: "Cúp Best Boyfriend",
    price: 65000,
    img: "Sản phẩm/SP Thú/cup (1).jpg",
    category: "Sản phẩm Thú",
    desc: "Cách tinh tế nhất để gửi lời khen tặng đến người thương! Chiếc cúp vàng len mini đi kèm thông điệp ý nghĩa, ngọt ngào giúp bạn nhắn nhủ rằng \"Anh chính là người tuyệt vời nhất\". Một món quà tinh thần độc đáo và giữ được bền lâu. ",
    material: "Len milk cotton"
  },
  "heo": {
    name: "Heo con dễ thương",
    price: 35000,
    img: "Sản phẩm/SP Thú/heo(5).jpg",
    category: "Sản phẩm Thú",
    desc: "Em heo hồng tròn xoe được \"lên đồ\" cực kỳ điệu đà với chiếc mũ thỏ tai dài và túi sách đeo chéo. Set quà được đặt thắt gọn gàng trong hộp kèm giấy rơm, là lựa chọn điểm 10 cho một món quà bất ngờ gửi tặng hội bạn thân. ",
    material: "Len milk cotton"
  },
  "minirose": {
    name: "Vườn Hồng Mini",
    price: 35000,
    img: "Sản phẩm/SP Khác/Bó hồng mini.jpg",
    category: "Sản phẩm Khác",
    desc: "Sự đan xen tinh tế giữa các sắc hồng: hồng đậm, hồng phấn và trắng tạo nên một cụm hoa bồng bềnh, nhỏ gọn. Nhỏ xinh hoàn hảo để làm móc khóa treo trên cặp sách túi đồ dành cho các cô gái, cô người yêu như nắm giữ giá trị bó hoa k tàn phai về tình bạn, tình iuuu.",
    material: "Len milk cotton"
  },
  "charm-hoa": {
    name: "Gió Sớm Đầu Mùa",
    price: 25000,
    img: "Sản phẩm/SP Khác/charm hoa.jpg",
    category: "Sản phẩm Khác",
    desc: "Chùm hoa treo balo gồm những bông tulip e ấp và hoa cúc trắng nhụy hồng mềm mại. Sợi dây treo dài tiện lợi giúp bạn dễ dàng F5 diện mạo cho chiếc balo, túi xách hay chìa khóa xe hằng ngày trở nên sinh động, tràn đầy sức sống.",
    material: "Len milk cotton"
  },
  "kep": {
    name: "Kẹp tóc Kuroba Kaito",
    price: 25000,
    img: "Sản phẩm/SP Khác/Kẹp (1).jpg",
    category: "Sản phẩm Khác",
    desc: "Món phụ kiện handmade mang phong cách đáng yêu và cá tính. Sản phẩm tái hiện gương mặt búp bê chibi với mái tóc đen, đôi má hồng xinh xắn và điểm nhấn một chiếc khuyên nhỏ cá tính. Được móc thủ công tỉ mỉ từ chất liệu len mềm mại, chiếc kẹp giữ tóc chắc chắn, là lựa chọn hoàn hảo để làm điệu cho mái tóc hoặc làm quà tặng thủ công độc đáo.",
    material: "Len milk cotton"
  },
  "kep-doll": {
    name: "Chibi Nhỏ Tinh Nghịch",
    price: 27000,
    img: "Sản phẩm/SP Khác/kẹp full body (1).jpg",
    category: "Sản phẩm Khác",
    desc: "Chiếc kẹp tóc tạo hình em bé má hồng, tóc xoăn được tỉa tót vô cùng khéo léo. Chỉ cần kẹp nhẹ lên tóc là đã có ngay một điểm nhấn điểm 10 cho sự dễ thương, giúp outfit đi học, đi làm hằng ngày thêm phần ngọt ngào.",
    material: "Len milk cotton"
  },
  "khan": {
    name: "Tự Hào Việt Nam",
    price: 120000,
    img: "Sản phẩm/SP Khác/khăn cờ đỏ (1).jpg",
    category: "Sản phẩm Khác",
    desc: "Thiết kế lấy cảm hứng từ màu cờ sắc áo Tổ quốc với tone đỏ rực rỡ và ngôi sao vàng năm cánh nổi bật ở góc. Món phụ kiện tuyệt vời làm điểm nhấn cho outfit trong các dịp lễ lớn, ngày Quốc khánh hay những chuyến đi phượt, chụp ảnh kỷ niệm mang niềm tự hào dân tộc.",
    material: "Len milk cotton"
  },
  "tui": {
    name: "Túi Tấm Cám Kẹo Bông Điệu Đà",
    price: 45000,
    img: "Sản phẩm/SP Khác/Túi may mắn (1).jpg",
    category: "Sản phẩm Khác",
    desc: "Chiếc túi rút nhỏ xinh tone trắng kem đính kèm chiếc nơ hồng pastel ngọt ngào. Tiện lợi để đựng những món đồ nhỏ xinh như tai nghe, thỏi son hay chun buộc tóc, giúp các cô nàng giữ mọi thứ gọn gàng mà vẫn giữ nét điệu đà hằng ngày.",
    material: "Len milk cotton"
  },
  "tui-deo": {
    name: "Mây Trắng Quai Hồng",
    price: 200000,
    img: "Sản phẩm/SP Khác/túi đeo tay.jpg",
    category: "Sản phẩm Khác",
    desc: "Xu hướng túi bọt biển (popcorn stitch) với những hạt len nổi phồng xốp mềm mại như những đám mây. Sự phối hợp ăn ý giữa thân túi trắng kem, quai đeo hồng và chiếc nơ satin tạo nên một item thanh lịch, dễ phối với các dáng váy tiểu thư xuống phố.",
    material: "Len milk cotton"
  },
  "tui-sao": {
    name: "Ngôi Sao May Mắn",
    price: 180000,
    img: "Sản phẩm/SP Khác/Túi-sao (1).jpg",
    category: "Sản phẩm Khác",
    desc: "Chiếc túi đỏ nổi bật được móc bằng sợi len bản to dày dặn, tạo form phồng xốp cực yêu. Đi kèm một bé sao nhỏ gắn thêm làm móc khóa tinh nghịch. Size túi vừa vặn để các nàng đựng son, điện thoại xuống phố dạo chơi.",
    material: "Len milk cotton"
  },
  "volleyball": {
    name: "Bóng Chuyền Năng Động",
    price: 220000,
    img: "Sản phẩm/SP Khác/Volleyball (1).jpg",
    category: "Sản phẩm Khác",
    desc: "Phiên bản \"mềm xèo\" và biết cười của quả bóng chuyền quen thuộc! Với biểu cảm mắt híp đáng yêu và đôi chân nhỏ xíu, bạn nhỏ này sẽ là người bạn đồng hành tuyệt vời để ôm ấp, làm quà tặng cho các tín đồ mê thể thao hoặc trang trí góc phòng học.",
    material: "Len milk cotton"
  },
  "Scrunches": {
    name: "Mây Xanh Điệu Đà",
    price: 55000,
    img: "Sản phẩm/SP Khác/Scrunches (1).jpg",
    category: "Sản phẩm Khác",
    desc: "Vừa giúp cố định búi tóc gọn gàng, vừa là món phụ kiện \"hack\" visual cực đỉnh cho các cô nàng tóc mây. Viền bèo trắng trên nền len xanh giúp mái tóc của bạn trông bồng bềnh, ngọt ngào như một nàng tiểu thư chính hiệu.",
    material: "Len milk cotton"
  },
  "custom": {
    name: "Yêu cầu thêm",
    price: 50000,
    img: "Sản phẩm/SP Khác/móc khóa xinh.jpg",
    category: "Yêu cầu khác",
    desc: "Bạn muốn một món len theo ý riêng? Nhắn cho tiệm để trao đổi mẫu và giá cụ thể bằng cách liên hệ qua Zalo: 0977902855.",
    material: "Len milk cotton"
  }
};